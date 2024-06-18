import express from 'express';
import { RestaurantsController } from '../controllers/restaurants.controller.js';
import { authMiddleware } from '../middlewarmies/require-access-token.middleware.js';
import { restaurantUpdateValidator } from '../middlewarmies/validation/restaurants-update-validator.middleware.js';

const restaurantsRouter = express.Router();

const restaurantsController = new RestaurantsController();

restaurantsRouter.get(
  '/me',
  authMiddleware,
  restaurantsController.getRestaurants
);
restaurantsRouter.post(
  '/me',
  authMiddleware,
  restaurantUpdateValidator,
  restaurantsController.updateRestaurants
);

export { restaurantsRouter };
