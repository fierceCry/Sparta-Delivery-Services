import express from 'express';
import { authRouter } from '../routers/auth.router.js';
import { usersRouter } from './users.router.js';
import { restaurantsRouter } from './restaurants.router.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/restaurants', restaurantsRouter);

export { router };
