import { HttpError } from '../errors/http.error.js';

export class ReviewsService {
  constructor(reviewsRepository) {
    this.reviewsRepository = reviewsRepository;
  }
  /* 리뷰 및 평점 생성 */
  create = async (user, customerordersstorageId, rate, content, imageUrl) => {
    const order = await this.reviewsRepository.findOrderById(
      customerordersstorageId,
      user.id
    );

    if (!order) {
      throw new HttpError.NotFound('존재하지 않는 주문 정보입니다.');
    }

    //리뷰 생성
    const data = await this.reviewsRepository.create({
      userId: user.id,
      restaurantId: order.restaurantId,
      customerordersstorageId,
      rate,
      content,
      imageUrl,
    });
    return data;
  };

  /* 리뷰 및 평점 목록 조회 */
  readMany = async (user, sort) => {
    const data = await this.reviewsRepository.readMany(user, sort);

    return data;
  };

  /* 리뷰 및 평점 상세 조회 */
  readOne = async (user, reviewId) => {
    const data = await this.reviewsRepository.readOne(user, reviewId);

    if (!data) {
      throw new HttpError.NotFound('리뷰가 존재하지 않습니다.');
    }
    return data;
  };

  /* 리뷰 및 평점 수정 */
  update = async (user, reviewId, rate, content, imageUrl) => {
    let data = await this.reviewsRepository.readOne(user, reviewId);

    if (!data) {
      throw new HttpError.NotFound('리뷰가 존재하지 않습니다.');
    }

    // 리뷰 수정
    data = await this.reviewsRepository.update(
      user,
      reviewId,
      rate,
      content,
      imageUrl
    );
    return data;
  };

  /* 리뷰 및 평점 목록 삭제 */
  delete = async (user, reviewId) => {
    let data = await this.reviewsRepository.readOne(user, reviewId);

    if (!data) {
      throw new HttpError.NotFound('리뷰가 존재하지 않습니다.');
    }

    //리뷰 삭제
    data = await this.reviewsRepository.delete(user.id, reviewId);

    return data;
  };
}
