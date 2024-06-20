import {
  notifyNewOrder,
  notifyDeliveryCompleted,
  notifyOrderConfirmed,
} from '../utils/socket.js';
import { HttpError } from '../errors/http.error.js';
export class OrdersService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository;
  }

  addToCart = async ({ userId, restaurantId, foodId, count }) => {
    const addToCart = await this.ordersRepository.addToCart({
      userId,
      restaurantId,
      foodId,
      count,
    });
  };

  createOrderFromCart = async ({ userId, restaurantId }) => {
    const data = await this.ordersRepository.createOrderFromCart({
      userId,
      restaurantId,
    });
    const result = await this.ordersRepository.findById(data.id)
    await notifyNewOrder(userId, restaurantId, result.id);
    return;
  };

  confirmOrder = async ({ restaurantId, orderId }) => {
    const bossConfirmOrder = await this.ordersRepository.confirmOrder({
      restaurantId,
      orderId,
    });
    return bossConfirmOrder;
  };

  deliveryOrder = async ({ restaurantId, orderId }) => {
    const deliveryOrder = await this.ordersRepository.deliveryOrder({
        restaurantId,
        orderId,
      });
  
      if (!deliveryOrder) {
        throw new HttpError.NotFound(`해당하는 주문을 찾을 수 없습니다.`);
      }

      // 업데이트된 주문 정보를 가져오기
      const result = await this.ordersRepository.findById(deliveryOrder.id);

      // 알림 보내기
      await notifyOrderConfirmed(restaurantId, orderId, result.id, result.userId);
  
      return deliveryOrder;
    }

    deliveryComplete = async ({ restaurantId, orderId }) => {
      const deliveryComplete = await this.ordersRepository.deliveryComplete({
        restaurantId,
        orderId,
      });

      if (!deliveryComplete) {
        throw new HttpError.NotFound(`해당하는 주문을 찾을 수 없습니다.`);
      }
        
      const result = await this.ordersRepository.findById(deliveryComplete.id);
          
      await notifyDeliveryCompleted(restaurantId, orderId, result.id, result.userId);
    
      return deliveryComplete;
    };
}
