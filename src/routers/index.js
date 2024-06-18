import express from 'express';
import { authRouter } from '../routers/auth.router.js';
import { foodsRouter } from './foods.router.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/restaurants', foodsRouter);
export { router };
