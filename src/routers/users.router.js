import express from 'express';
import { UserController } from '../controllers/users.controllers.js';
import { UserService } from '../services/users.services.js';
import { UserRepository } from '../repositories/users.repository.js';
import { authMiddleware } from '../middlewarmies/require-access-token.middleware.js';
import { usersUpdateValidator } from '../middlewarmies/validation/users-update-validator.middleware.js';
import { prisma } from '../utils/utils.prisma.js';
import { refreshTokenMiddleware} from '../middlewarmies/require-refresh-token.middleware.js';
const usersRouter = express.Router();

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

/** 고객 정보 조회 **/
usersRouter.get('/me', authMiddleware, userController.getUser);

/** 고객 정보 수정 **/
usersRouter.patch(
  '/me',
  authMiddleware,
  usersUpdateValidator,
  userController.updateUser
);

/** 로그아웃 **/
usersRouter.post('/sign-out', refreshTokenMiddleware, userController.logOut)

export { usersRouter };
