import express from 'express';
import { RestaurantsController } from '../controllers/restaurants.controller.js';
import { RestaurantsService } from '../services/restaurants.services.js';
import { RestaurantsRepository } from '../repositories/restaurants.repository.js';
import { prisma } from '../utils/utils.prisma.js';
import { authMiddleware } from '../middlewarmies/require-access-token.middleware.js';
import { restaurantUpdateValidator } from '../middlewarmies/validation/restaurants-update-validator.middleware.js';

const restaurantsRouter = express.Router();

const restaurantsRepository = new RestaurantsRepository(prisma);
const restaurantsService = new RestaurantsService(restaurantsRepository);
const restaurantsController = new RestaurantsController(restaurantsService);

restaurantsRouter.get('/all', restaurantsController.getAllRestaurants);
restaurantsRouter.get(
  '/me',
  authMiddleware,
  restaurantsController.getRestaurants
);
restaurantsRouter.patch(
  '/me',
  authMiddleware,
  restaurantUpdateValidator,
  restaurantsController.updateRestaurants
);
restaurantsRouter.patch(
  '/totalPrice',
  restaurantsController.updateRestaurantsTotalPrice
);
restaurantsRouter.get('/rankings', restaurantsController.getRankings);

export { restaurantsRouter };
