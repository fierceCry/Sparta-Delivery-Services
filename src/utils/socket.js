import { WebSocketServer } from 'ws';
import { prisma } from './utils.prisma.js';
import { NotificationRepository } from '../repositories/notifications.repository.js';
import { authMiddleware } from '../middlewarmies/require-access-token.middleware.js';
import { AuthRepository } from '../repositories/auth.repository.js';

const notificationRepository = new NotificationRepository(prisma);
const authRepository = new AuthRepository(prisma);

const customerConnections = new Map();
const restaurantOwnerConnections = new Map();

const createWebSocketServer = (server) => {
  const wss = new WebSocketServer({ server });
  wss.on('connection', (ws, req) => handleConnection(ws, req));
  return wss;
};

const handleConnection = async (ws, req) => {
  console.log('WebSocket 연결되었습니다.');

  try {
    await authMiddleware(req, {}, async (error) => {
      if (error) {
        console.error('Authentication failed:', error);
        ws.close();
        return;
      }

      const user = req.user;
      if (user.email) {
        addConnection(customerConnections, user.email, ws);
      } else if (user.bossEmail) {
        addConnection(restaurantOwnerConnections, user.bossEmail, ws);
      } else {
        console.warn('Unknown user type');
        ws.close();
        return;
      }

      ws.on('message', (message) => handleMessage(message, ws));
      ws.on('close', () => handleDisconnection(user));
    });
  } catch (error) {
    console.error('WebSocket 에러가 발생했습니다:', error);
    ws.close();
  }
};

const addConnection = (connectionMap, key, ws) => {
  ws.userId = key;
  connectionMap.set(key, ws);
};

const handleDisconnection = (user) => {
  console.log('클라이언트 연결이 종료되었습니다.');
  if (user.email) {
    customerConnections.delete(user.id);
  } else if (user.bossEmail) {
    restaurantOwnerConnections.delete(user.bossEmail);
  }
};

// 웹소켓에서 사장 조회
const findRestaurantOwnerWebSocket = async (restaurantId) => {
  const data = await authRepository.findByRestaurantsId(restaurantId);
  if (restaurantOwnerConnections.has(data.bossEmail)) {
    return restaurantOwnerConnections.get(data.bossEmail);
  }
  return null;
};
// 웹소켓에서 고객 조회
const findUsersOwnerWebSocket = async (userId) => {
  const data = await authRepository.findByUserId(userId);
  if (customerConnections.has(data.email)) {
    return customerConnections.get(data.email);
  }
  return null;
};

// 주문 생성 알림
const notifyNewOrder = async (userId, restaurantId, orderId) => {

  const notificationMessage = `새로운 주문이 생성되었습니다. 주문 ID: ${orderId}`;
  
  await notificationRepository.notificationsCreate({
    userId,
    restaurantId,
    customerordersstorageId: orderId,
    notificationMessage
  });

  const restaurantOwnerWebSocket = await findRestaurantOwnerWebSocket(restaurantId);
  
  if (restaurantOwnerWebSocket) {
    restaurantOwnerWebSocket.send(JSON.stringify({
      type: 'notification',
      data: notificationMessage
    }));
  } else {
    console.warn(`식당 주인의 WebSocket 연결을 찾을 수 없습니다. 식당 ID: ${restaurantId}`);
  }
};

// 배달 시작 알림
const notifyOrderConfirmed = async (restaurantId, orderId, customerOrdersStorageId, userId) => {
  const notificationMessage = `배달이 시작되었습니다. 주문 ID: ${orderId}`;
  
  await notificationRepository.notificationsCreate({
    userId,
    restaurantId,
    customerordersstorageId: customerOrdersStorageId,
    notificationMessage
  });

  const customerWebSocket = await findUsersOwnerWebSocket(userId);
  if (customerWebSocket) {
    customerWebSocket.send(JSON.stringify({
      type: 'notification',
      data: notificationMessage
    }));
  } else {
    console.warn(`고객님의 WebSocket 연결을 찾을 수 없습니다. 사용자 ID: ${userId}`);
  }
};

// 배달 완료 알림
const notifyDeliveryCompleted = async (restaurantId, orderId, customerOrdersStorageId, userId) => {
  
  const notificationMessage = `배달이 완료되었습니다. 주문 ID: ${orderId}`;

  await notificationRepository.notificationsCreate({
    userId,
    restaurantId,
    customerordersstorageId: customerOrdersStorageId,
    notificationMessage
  });
  const customerWebSocket = await findUsersOwnerWebSocket(userId);
  if (customerWebSocket) {
    customerWebSocket.send(JSON.stringify({
      type: 'notification',
      data: notificationMessage
    }));
  } else {
    console.warn(`고객님의 WebSocket 연결을 찾을 수 없습니다. 사용자 ID: ${userId}`);
  }
};

export { createWebSocketServer, notifyNewOrder, notifyDeliveryCompleted, notifyOrderConfirmed };