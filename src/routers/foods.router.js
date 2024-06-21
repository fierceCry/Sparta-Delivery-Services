import express from 'express';
import { FoodsController } from '../controllers/foods.controllers.js';
import { FoodsService } from '../services/foods.services.js';
import { FoodsRepository } from '../repositories/foods.repository.js';
import { prisma } from '../utils/utils.prisma.js';
import { postFoodValidator } from '../middlewarmies/validation/post-food.validator.js';
import { authMiddleware } from '../middlewarmies/require-access-token.middleware.js';
import multer from 'multer';

const foodsRouter = express.Router();
const upload = multer();

const foodsRepository = new FoodsRepository(prisma);
const foodsService = new FoodsService(foodsRepository);
const foodsController = new FoodsController(foodsService);

/** 업장 메뉴 생성 **/
foodsRouter.post(
  '/foods',
  authMiddleware,
  upload.array('images', 10),
  postFoodValidator,
  foodsController.create
);

/** 업장 조회 **/
foodsRouter.get('/:restaurantId/foods', foodsController.readMany);

/** 업장 메뉴 수정 **/
foodsRouter.patch(
  '/foods/:foodId',
  authMiddleware,
  upload.array('images', 10),
  postFoodValidator,
  foodsController.update
);

/** 업장 메뉴 삭제 **/
foodsRouter.delete(
  '/foods/:foodId',
  authMiddleware,
  foodsController.delete
);

export { foodsRouter };
