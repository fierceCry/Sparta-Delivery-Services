import { HttpError } from '../errors/http.error.js';
import { uploadImageS3, deleteImageS3 } from './s3.services.js';
import { getStarRating } from '../constants/review.constants.js';

export class ReviewsService {
  constructor(reviewsRepository, ordersRepository) {
    this.reviewsRepository = reviewsRepository;
    this.ordersRepository = ordersRepository;
  }

  /* 리뷰 및 평점 생성 */
  create = async (user, customerordersstorageId, rate, content, images) => {
    const order = await this.ordersRepository.findOrderById(
      parseInt(customerordersstorageId),
      user.id
    );

    if (!order) {
      throw new HttpError.NotFound('존재하지 않는 주문 정보입니다.');
    }

    if (!images || images.length === 0) {
      throw new HttpError.BadRequest('한 장 이상의 이미지를 입력해주세요.');
    }

    // 이미지 s3 업로드
    const imageUrl = await Promise.all(
      images.map((image) => uploadImageS3(image))
    );

    // 별표로 변환
    const starRating = getStarRating(rate);

    // 리뷰 생성
    const data = await this.reviewsRepository.create({
      userId: user.id,
      restaurantId: order.id,
      customerordersstorageId: +customerordersstorageId,
      rate: starRating,
      content,
      imageUrl: JSON.stringify(imageUrl),
    });
    return data;
  };

  /* 리뷰 및 평점 목록 조회 */
  readMany = async (user, sort = 'desc') => {
    const data = await this.reviewsRepository.readMany(user);
    // 리뷰 목록 정렬
    const sortOrder = sort.toLowerCase() === 'asc' ? 'asc' : 'desc';

    return data.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.createdAt - b.createdAt;
      } else {
        return b.createdAt - a.createdAt;
      }
    });
  };

  /* 리뷰 및 평점 상세 조회 */
  readOne = async (user, reviewId) => {
    const data = await this.reviewsRepository.readOne(reviewId, user);

    if (!data) {
      throw new HttpError.NotFound('존재하지 않는 리뷰입니다.');
    }
    return data;
  };

  /* 리뷰 및 평점 수정 */
  update = async (reviewId, user, rate, content, images, deleteImages) => {
    let data = await this.reviewsRepository.readOne(reviewId, user);

    if (!data) {
      throw new HttpError.NotFound('존재하지 않는 리뷰입니다.');
    }

    // 기존 이미지 불러오기
    let imageUrl = data.imageUrl;
    if (typeof imageUrl === 'string') {
      try {
        imageUrl = JSON.parse(imageUrl);
      } catch (e) {
        imageUrl = [];
      }
    }

    // 삭제할 이미지 제거
    if (deleteImages && deleteImages.length > 0) {
      imageUrl = imageUrl.filter((url) => !deleteImages.includes(url));

      // 실제 S3에서 이미지 삭제
      await Promise.all(
        deleteImages.map((url) => {
          return deleteImageS3(url);
        })
      );
    }

    // 이미지 s3 업로드
    if (images && images.length > 0) {
      const newImageUrl = await Promise.all(
        images.map((image) => uploadImageS3(image))
      );
      imageUrl = imageUrl.concat(newImageUrl);
    }

    // 이미지 초과 오류
    if (imageUrl.length > 5) {
      throw new HttpError.BadRequest('이미지를 더 추가할 수 없습니다.');
    }

    // 별표로 변환
    const starRating = getStarRating(rate);

    // 업데이트할 데이터 정의
    const updateData = {
      rate: starRating,
      content,
      imageUrl: JSON.stringify(imageUrl),
    };

    // 리뷰 수정
    data = await this.reviewsRepository.update(user, reviewId, updateData);

    return data;
  };

  /* 리뷰 및 평점 삭제 */
  delete = async (user, reviewId) => {
    let data = await this.reviewsRepository.readOne(reviewId, user);

    if (!data) {
      throw new HttpError.NotFound('존재하지 않는 리뷰입니다.');
    }

    // 리뷰 삭제
    data = await this.reviewsRepository.delete(user, reviewId);

    return data;
  };
}
