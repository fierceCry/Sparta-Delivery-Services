import express from 'express';
import { UserController } from '../controllers/users.controllers.js';
import { UserService } from '../services/users.services.js';
import { UserRepository } from '../repositories/users.repository.js';
import { authMiddleware } from '../middlewarmies/require-access-token.middleware.js';
import { usersUpdateValidator } from '../middlewarmies/validation/users-update-validator.middleware.js';
import { prisma } from '../utils/utils.prisma.js';

const usersRouter = express.Router();

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

usersRouter.get('/me', authMiddleware, userController.getUser);
usersRouter.patch(
  '/me',
  authMiddleware,
  usersUpdateValidator,
  userController.updateUser
);

export { usersRouter };
