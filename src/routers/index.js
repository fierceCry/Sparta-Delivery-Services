import express from 'express';
import { authRouter } from '../routers/auth.router.js';
import { reviewRouter } from '../routers/reviews.router.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('orders/:customerordersstorageId/reviews', reviewRouter);
export { router };
