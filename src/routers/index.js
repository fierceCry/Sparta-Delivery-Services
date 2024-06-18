import express from 'express';
import { authRouter } from '../routers/auth.router.js';
import { searchRouter } from './search.router.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/search', searchRouter)
export { router };
