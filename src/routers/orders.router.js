import express from 'express';
import {prisma} from '../utils/utils.prisma.js';
import { OrdersController } from '../controllers/orders.controllers.js';
import { OrdersService } from '../services/orders.services.js';
import { OrdersRepository } from '../repositories/orders.repository.js';
import {authMiddleware} from '../middlewarmies/require-access-token.middleware.js'

const ordersRouter = express.Router();

const ordersRepository = new OrdersRepository(prisma);
const ordersService = new OrdersService(ordersRepository);
const ordersController = new OrdersController(ordersService);

ordersRouter.post('/restaurants/:restaurantId/foods/:foodId', authMiddleware, ordersController.addToCart);
ordersRouter.patch('/restaurants/:restaurantId/pending', authMiddleware, ordersController.createOrderFromCart);
ordersRouter.patch('/:orderId/restaurants/preparing', authMiddleware, ordersController.bossConfirmOrder);
ordersRouter.patch('/:orderId/restaurants/delivering', authMiddleware, ordersController.bossDeliveryOrder);
ordersRouter.patch('/:orderId/restaurants/delivered', authMiddleware, ordersController.bossDeliveryComplete);


export {ordersRouter};