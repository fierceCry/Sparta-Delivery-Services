import express from 'express';
import { RestaurantsController } from '../controllers/restaurants.controller.js';

const restaurantsRouter = express.Router();

const restaurantsController = new RestaurantsController();

restaurantsRouter.get(
  '/restaurant/me/:id',
  restaurantsController.getRestaurants
);
restaurantsRouter.post(
  '/restaurant/me/:id',
  restaurantsController.updateRestaurants
);

export { restaurantsRouter };
