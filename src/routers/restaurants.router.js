import express from 'express';
import { RestaurantsController } from '../controllers/restaurants.controller.js';
import { prisma } from '../utils/utils.prisma.js';
const restaurantsRouter = express.Router();

const restaurantsController = new RestaurantsController();

restaurantsRouter.get(
  '/restaurant/me/:id',
  restaurantsController.getRestaurants
);

export { restaurantsRouter };
