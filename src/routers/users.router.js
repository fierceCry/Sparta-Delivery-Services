import express from 'express';
import { UsersController } from '../controllers/users.controllers.js';
import { authMiddleware } from '../middlewarmies/require-access-token.middleware.js';

const usersRouter = express.Router();

const usersController = new UsersController();

usersRouter.get('/me', authMiddleware, usersController.getUser);

export { usersRouter };
