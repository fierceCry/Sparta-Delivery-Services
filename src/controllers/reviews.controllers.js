import { getStarRating } from '../constants/review.constants.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
export class ReviewsController {
  constructor(reviewsService) {
    this.reviewsService = reviewsService;
  }
  /* 리뷰 및 평점 생성 */
  create = async (req, res, next) => {
    try {
      const user = req.user;
      const { customerordersstorageId } = req.params;
      const { rate, content } = req.body;
      const image = req.file;

      // 별표로 변환
      const starRating = getStarRating(rate);

      const data = await this.reviewsService.create(
        user,
        customerordersstorageId,
        starRating,
        content,
        image
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: '리뷰가 성공적으로 생성되었습니다.',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  /* 리뷰 및 평점 목록 조회 */
  readMany = async (req, res, next) => {
    try {
      const user = req.user;
      const { sort } = req.query;

      const data = await this.reviewsService.readMany(user, sort || 'desc');

      res.status(HTTP_STATUS.OK).json({ status: HTTP_STATUS.OK, data });
    } catch (error) {
      next(error);
    }
  };

  /* 리뷰 및 평점 상세 조회 */
  readOne = async (req, res, next) => {
    try {
      const user = req.user;
      const { reviewId } = req.params;

      //리뷰 조회
      const data = await this.reviewsService.readOne(user, reviewId);

      res.status(HTTP_STATUS.OK).json({ status: HTTP_STATUS.OK, data });
    } catch (error) {
      next(error);
    }
  };

  /* 리뷰 및 평점 수정 */
  update = async (req, res, next) => {
    try {
      const user = req.user;
      const { reviewId } = req.params;
      const { rate, content } = req.body;
      const image = req.file;

      // 별표로 변환
      const starRating = getStarRating(rate);

      const data = await this.reviewsService.update(
        reviewId,
        user,
        starRating,
        content,
        image
      );

      res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '리뷰가 성공적으로 수정되었습니다.',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  /* 리뷰 및 평점 삭제 */
  delete = async (req, res, next) => {
    try {
      const user = req.user;
      const { reviewId } = req.params;

      const data = await this.reviewsService.delete(user, reviewId);

      res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '리뷰가 성공적으로 삭제되었습니다.',
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}
