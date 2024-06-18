import express from 'express';
import { FoodsController } from '../controllers/foods.controllers.js';
import { FoodsService } from '../services/foods.services.js';
import { FoodsRepository } from '../repositories/foods.repository.js';
import { prisma } from '../utils/utils.prisma.js';
import { postFoodValidator } from '../middlewarmies/validation/postFood.validator.js';
import { authMiddleware } from '../middlewarmies/require-access-token.middleware.js';

// 테스트
// const testMiddleware = (req, res, next) => {
//     req.user = { id: 1 }; // 테스트용 ID 설정
//     next();
// };

const foodsRouter = express();

const foodsRepository = new FoodsRepository(prisma);
const foodsService = new FoodsService(foodsRepository);
const foodsController = new FoodsController(foodsService);

foodsRouter.post(
    '/:restaurantId/foods',
    authMiddleware,
    foodsController.create
);

foodsRouter.get(
    '/:restaurantId/foods',
    foodsController.readMany
);

//혹시나 만든 메뉴 상세조회
foodsRouter.get(
    '/:restaurantId/foods/:foodId',
    foodsController.readOne
);

foodsRouter.patch(
    '/:restaurantId/foods/:foodId',
    authMiddleware,
    postFoodValidator,
    foodsController.update
);

foodsRouter.delete(
    '/:restaurantId/foods/:foodId',
    authMiddleware,
    foodsController.delete
);

export { foodsRouter };
