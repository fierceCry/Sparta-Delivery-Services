import express from 'express';
import { AuthController } from '../controllers/auth.controllers.js';
import { AuthService } from '../services/auth.services.js';
import { AuthRepository } from '../repositories/auth.repository.js';
import { prisma } from '../utils/utils.prisma.js';
import { signInValidator } from '../middlewarmies/validation/sign-in-validator.middleware.js';
import { signUpValidator } from '../middlewarmies/validation/sign-up-validator.middleware.js';
import { restaurantSignUpValidator } from '../middlewarmies/validation/restaurant-validator.middleware.js'
const authRouter = express();

const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRouter.post('/users/sign-up', signUpValidator, authController.signUp);
authRouter.post('/users/sign-in', signInValidator, authController.signIn);
authRouter.post('/restaurants/sign-up', restaurantSignUpValidator, authController.signUpRestaurant);

export { authRouter };
