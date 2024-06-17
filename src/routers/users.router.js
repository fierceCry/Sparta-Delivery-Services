import express from 'express';
import { UsersController } from '../controllers/users.controllers.js';

const usersRouter = express.Router();

const usersController = new UsersController();

usersRouter.get('/user/me/:id', usersController.getUser);

export { usersRouter };
