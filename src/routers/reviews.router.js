import express from 'express';
import multer from 'multer';
import { prisma } from '../utils/utils.prisma.js';
import { authMiddleware } from '../middlewarmies/require-access-token.middleware.js';
import { createReiWeValidator } from '../middlewarmies/validation/create-review-validator.middleware.js';
import { updateReiWeValidator } from '../middlewarmies/validation/update-review-validator.middleware.js';
import { ReviewsController } from '../controllers/reviews.controllers.js';
import { ReviewsService } from '../services/reviews.services.js';
import { ReviewsRepository } from '../repositories/reviews.repository.js';
import { OrdersRepository } from '../repositories/orders.repository.js';

const reviewRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const ordersRepository = new OrdersRepository(prisma);
const reviewsRepository = new ReviewsRepository(prisma);
const reviewsService = new ReviewsService(reviewsRepository, ordersRepository);
const reviewsController = new ReviewsController(reviewsService);

/* 리뷰 및 평점 생성 */
reviewRouter.post(
  '/orders/:orderId/reviews',
  authMiddleware,
  upload.array('images', 5),
  createReiWeValidator,
  reviewsController.create
);

/* 리뷰 및 평점 목록 조회 */
reviewRouter.get('/reviews', authMiddleware, reviewsController.readMany);

/* 리뷰 및 평점 상세 조회 */
reviewRouter.get(
  '/reviews/:reviewId',
  authMiddleware,
  reviewsController.readOne
);

/* 리뷰 및 평점 수정 */
reviewRouter.patch(
  '/reviews/:reviewId',
  authMiddleware,
  upload.array('images', 5),
  updateReiWeValidator,
  reviewsController.update
);

/* 리뷰 및 평점 목록 삭제 */
reviewRouter.delete(
  '/reviews/:reviewId',
  authMiddleware,
  reviewsController.delete
);

export { reviewRouter };
