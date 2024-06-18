import express from 'express';
import {prisma} from '../utils/utils.prisma.js';
import { OrdersController } from '../controllers/orders.controllers.js';
import { OrdersService } from '../services/orders.services.js';
import { OrdersRepository } from '../repositories/orders.repository.js';
import {authMiddleware} from '../middlewarmies/require-access-token.middleware.js'

const ordersRouter = express();

const ordersRepository = new OrdersRepository(prisma);
const ordersService = new OrdersService(ordersRepository);
const ordersController = new OrdersController(ordersService);

ordersRouter.post('/restaurants/:restaurantId/foods/:foodId', authMiddleware, ordersController.customerOrder);
ordersRouter.patch('/:ordersId', authMiddleware, ordersController.bossConfirmOrder);
ordersRouter.patch('/:ordersId', authMiddleware, ordersController.bossDeliveryOrder);
ordersRouter.patch('/:ordersId', authMiddleware, ordersController.bossDeliveryComplete);


export {ordersRouter};