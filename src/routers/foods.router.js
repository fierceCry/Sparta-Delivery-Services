import express from 'express';
import { FoodsController } from '../controllers/foods.controllers.js';
import { FoodsService } from '../services/foods.services.js';
import { FoodsRepository } from '../repositories/foods.repository.js';
import { prisma } from '../utils/utils.prisma.js';
import { postFoodValidator } from '../middlewarmies/validation/postFood.validator.js';
import { authMiddleware } from '../middlewarmies/require-access-token.middleware.js';


import multer from 'multer';
import { S3Client} from '@aws-sdk/client-s3';
import { dotenv } from 'dotenv';

dotenv.config()

const bucketName = process.env.BUCKETNAME
const bucketRegion = process.env.BUCKETREGION
const accesccKey = process.env.ACCESCCKEY
const sercretAccesccKey = process.env.SECRETACCESCCKEY

const foodsRouter = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage})

const foodsRepository = new FoodsRepository(prisma);
const foodsService = new FoodsService(foodsRepository);
const foodsController = new FoodsController(foodsService);

foodsRouter.post(
  '/:restaurantId/foods',
  upload.single('image'),
  authMiddleware,
  foodsController.create
);

foodsRouter.get('/:restaurantId/foods', foodsController.readMany);

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

