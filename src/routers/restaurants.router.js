import express from 'express';
import { RestaurantsController } from '../controllers/restaurants.controller.js';

const restaurantsRouter = express.Router();

const restaurantsController = new RestaurantsController();

restaurantsRouter.get('/me', restaurantsController.getRestaurants);
restaurantsRouter.post('/me', restaurantsController.updateRestaurants);

export { restaurantsRouter };
