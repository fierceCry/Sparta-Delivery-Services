import express from 'express';
import { prisma } from '../utils/utils.prisma.js';
import { OrdersController } from '../controllers/orders.controllers.js';
import { OrdersService } from '../services/orders.services.js';
import { OrdersRepository } from '../repositories/orders.repository.js';
import { authMiddleware } from '../middlewarmies/require-access-token.middleware.js';

const ordersRouter = express.Router();

const ordersRepository = new OrdersRepository(prisma);
const ordersService = new OrdersService(ordersRepository);
const ordersController = new OrdersController(ordersService);

/** 고객 메뉴 주문 생성 **/
ordersRouter.post(
  '/restaurants/:restaurantId/foods/:foodId',
  authMiddleware,
  ordersController.addToCart
);

/** 고객 주문 결제 **/
ordersRouter.patch(
  '/restaurants/:restaurantId/pending',
  authMiddleware,
  ordersController.createOrderFromCart
);

/** 업장 주문 수락 **/
ordersRouter.patch(
  '/:orderId/restaurants/preparing',
  authMiddleware,
  ordersController.bossConfirmOrder
);

/** 업장 배달 시작 **/
ordersRouter.patch(
  '/:orderId/restaurants/delivering',
  authMiddleware,
  ordersController.bossDeliveryOrder
);

/** 업장 배달 완료 **/
ordersRouter.patch(
  '/:orderId/restaurants/delivered',
  authMiddleware,
  ordersController.bossDeliveryComplete
);

export { ordersRouter };
