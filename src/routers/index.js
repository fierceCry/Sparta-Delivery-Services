import express from 'express';
import { authRouter } from '../routers/auth.router.js';
import { usersRouter } from './users.router.js';
import { restaurantsRouter } from './restaurants.router.js';
import { foodsRouter } from './foods.router.js';
import { reviewRouter } from '../routers/reviews.router.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/restaurants', restaurantsRouter);
router.use('/restaurants', foodsRouter);
router.use('/', reviewRouter);
export { router };
