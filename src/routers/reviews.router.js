import { Router } from 'express';
import { prisma } from '../utils/utils.prisma.js';
import { authMiddleware } from '../middlewarmies/require-access-token.middleware.js';
import { createReiveValidator } from '../middlewarmies/validation/create-review-validator.middleware.js';
import { updateReiveValidator } from '../middlewarmies/validation/update-review-validator.middleware.js';

const reviewRouter = Router();
/* 리뷰 및 평점 생성 */
reviewRouter.post(
  '/orders/:customerordersstorageId/reviews',
  authMiddleware,
  createReiveValidator,
  async (req, res, next) => {
    try {
      const user = req.user;
      const { customerordersstorageId } = req.params;
      const { rate, content, imageUrl } = req.body;

      //customerordersstorageId 이용하여 테이블에서 주문 찾기
      const customerOrder = await prisma.customer_orders_storage.findUnique({
        where: { id: +customerordersstorageId },
        include: { users: true, restaurants: true },
      });

      // 주문이 존재하지 않거나, 주문이 사용자와 관계없을 때
      if (!customerOrder || customerOrder.userId !== user.id) {
        return res
          .status(400)
          .json({ message: '유효하지 않은 주문 정보입니다.' });
      }

      //리뷰 생성
      const data = await prisma.reviews.create({
        data: {
          userId: user.id,
          restaurantId: customerOrder.restaurantId,
          customerordersstorageId: customerOrder.id,
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
  }
);

/* 리뷰 및 평점 목록 조회 */
reviewRouter.get('/reviews', authMiddleware, async (req, res, next) => {
  try {
    const user = req.user;

    //리뷰 목록 정렬
    const { sort = 'desc' } = req.query;
    const sortOrder = sort.toLowerCase() === 'asc' ? 'asc' : 'desc';

    //리뷰 목록 조회
    const reviews = await prisma.reviews.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: sortOrder },
      select: {
        users: { select: { nickname: true } },
        restaurants: { select: { name: true } },
        rate: true,
        content: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    //출력 내용
    const data = reviews.map((review) => ({
      userNickname: review.users.nickname,
      restaurantName: review.restaurants.name,
      rate: review.rate,
      content: review.content,
      imageUrl: review.imageUrl,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    }));

    res.status(200).json({ status: 200, data });
  } catch (error) {
    next(error);
  }
});

/* 리뷰 및 평점 상세 조회 */
reviewRouter.get(
  '/reviews/:reviewId',
  authMiddleware,
  async (req, res, next) => {
    try {
      const user = req.user;
      const { reviewId } = req.params;

      //리뷰 조회
      const data = await prisma.reviews.findFirst({
        where: { id: +reviewId, userId: user.id },
        select: {
          users: { select: { nickname: true } },
          restaurants: { select: { name: true } },
          rate: true,
          content: true,
          imageUrl: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!data) {
        return res
          .status(404)
          .json({ status: 404, message: '리뷰가 존재하지 않습니다.' });
      }

      res.status(200).json({ status: 200, data });
    } catch (error) {
      next(error);
    }
  }
);

/* 리뷰 및 평점 수정 */
reviewRouter.patch(
  '/reviews/:reviewId',
  authMiddleware,
  updateReiveValidator,
  async (req, res, next) => {
    try {
      const user = req.user;
      const { reviewId } = req.params;
      const { rate, content, imageUrl } = req.body;

      //리뷰 조회
      let data = await prisma.reviews.findFirst({
        where: { id: +reviewId, userId: user.id },
      });

      if (!data) {
        return res
          .status(404)
          .json({ status: 404, message: '리뷰가 존재하지 않습니다.' });
      }

      // 리뷰 수정
      data = await prisma.reviews.update({
        where: { id: +reviewId },
        data: {
          ...(rate && { rate }),
          ...(content && { content }),
          ...(imageUrl && { imageUrl }),
        },
      });

      res.status(200).json({
        status: 200,
        message: '리뷰가 성공적으로 수정되었습니다.',
        data,
      });
    } catch (error) {
      next(error);
    }
  }
);

/* 리뷰 및 평점 목록 삭제 */
reviewRouter.delete(
  '/reviews/:reviewId',
  authMiddleware,
  async (req, res, next) => {
    try {
      const user = req.user;
      const { reviewId } = req.params;

      //리뷰 조회
      let data = await prisma.reviews.findFirst({
        where: { id: +reviewId, userId: user.id },
      });

      if (!data) {
        return res
          .status(404)
          .json({ status: 404, message: '리뷰가 존재하지 않습니다.' });
      }

      //리뷰 삭제
      data = await prisma.reviews.delete({
        where: { id: +reviewId },
      });

      res.status(200).json({
        status: 200,
        message: '리뷰가 성공적으로 삭제되었습니다.',
        data: { id: data.id },
      });
    } catch (error) {
      next(error);
    }
  }
);

export { reviewRouter };
