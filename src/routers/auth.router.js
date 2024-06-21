import express from 'express';
import { AuthController } from '../controllers/auth.controllers.js';
import { AuthService } from '../services/auth.services.js';
import { AuthRepository } from '../repositories/auth.repository.js';
import { prisma } from '../utils/utils.prisma.js';
import { signInValidator } from '../middlewarmies/validation/sign-in-validator.middleware.js';
import { signUpValidator } from '../middlewarmies/validation/sign-up-validator.middleware.js';
import { restaurantSignUpValidator } from '../middlewarmies/validation/restaurant-validator.middleware.js';

const authRouter = express.Router();

const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

/** 고객 회원가입 **/
authRouter.post('/users/sign-up', signUpValidator, authController.signUp);

/** 업장 회원가입 **/
authRouter.post(
  '/restaurants/sign-up',
  restaurantSignUpValidator,
  authController.signUpRestaurant
);

/** 로그인 **/
authRouter.post('/users/sign-in', signInValidator, authController.signIn);

/** 이메일 인증코드 전송 **/
authRouter.post('/email/code', authController.sendVerificationEmail);

/** 이메일 인증코드 check **/
authRouter.post('/email/validator', authController.verifyEmail);

export { authRouter };
