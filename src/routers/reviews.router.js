import { Router } from 'express';
import { prisma } from '../utils/utils.prisma.js';
import { createReiveValidator } from '../middlewarmies/validation/create-review-validator.middleware.js';

const reviewRouter = Router();
/* 리뷰 및 평점 생성 */
reviewRouter.post('/', createReiveValidator, async (req, res, next) => {
  try {
    const user = req.user;
    const { customerordersstorageId } = req.params;
    const { rate, content, imageUrl } = req.body;

    const customerOder = await prisma.customer_orders_storage.findUnique({
      where: { id: +customerordersstorageId },
      include: { users: true, restaurants: true },
    });

    if (!customerOder || customerOder.userId !== user.id) {
      return res
        .status(400)
        .json({ message: '유효하지 않은 주문 정보입니다.' });
    }

    //리뷰 생성
    const data = await prisma.reviews.create({
      data: {
        id,
        userId: user.id,
        restaurantId: customerOder.restaurantId,
        customerordersstorageId: customerOder.id,
        rate,
        content,
        imageUrl,
      },
    });

    return res.status(201).json({
      status: 201,
      message: '리뷰가 성공적으로 생성되었습니다.',
      data,
    });
  } catch (error) {
    next(error);
  }
});

/* 리뷰 및 평점 목록 조회 */
reviewRouter.get('/', async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

/* 리뷰 및 평점 상세 조회 */
reviewRouter.get('/:reviewId', async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

/* 리뷰 및 평점 수정 */
reviewRouter.patch('/:reviewId', async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

/* 리뷰 및 평점 목록 삭제 */
reviewRouter.delete('/:reviewId', async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export { reviewRouter };
