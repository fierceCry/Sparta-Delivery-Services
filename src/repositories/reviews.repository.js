import { getNumRating } from '../constants/review.constants.js';

export class ReviewsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  /* 리뷰 및 평점 생성 */

  /*주문 조회*/
  findOrderById = async (orders, userId) => {
    const order = await this.prisma.orders.findUnique({
      where: { id: +orders },
      include: { users: true, restaurants: true },
    });

    // 주문이 존재하지 않거나, 주문이 사용자와 관계없을 때
    if (!order || order.userId !== userId) {
      return null;
    }
    return order;
  };

  /*리뷰 생성*/
  create = async ({
    userId,
    restaurantId,
    orderId,
    rate,
    content,
    imageUrl,
  }) => {
    const order = await this.prisma.orders.findUnique({
      where: {
        id: +orderId,
      },
      select: {
        state: true
      }
    });
    const data = await this.prisma.reviews.create({
      data: {
        userId,
        restaurantId,
        orderId: orderId,
        rate,
        content,
        imageUrl,
      },
    });
    //전수원 24-06-20 추가
    const findRate = await this.prisma.reviews.findMany({
      where: { restaurantId },
      select: {
        rate: true,
      },
    });
    let totalRate = 0;
    const reviewsRate = await findRate.map((el) => getNumRating(el.rate));
    reviewsRate.forEach((rate) => {
      totalRate += rate;
    });
    const reviewsAvgRate = totalRate / reviewsRate.length;
    await this.prisma.restaurants.update({
      where: { id: +restaurantId },
      data: {
        restaurantRatingAvg: reviewsAvgRate,
      },
    });
    //전수원 24-06-20 추가
    return data;
  };

  /* 리뷰 및 평점 목록 조회 */
  readMany = async (user, sort = 'desc') => {
    //리뷰 목록 정렬
    const sortOrder = sort.toLowerCase() === 'asc' ? 'asc' : 'desc';

    const reviews = await this.prisma.reviews.findMany({
      where: { userId: +user.id },
      orderBy: { createdAt: sortOrder },
      select: {
        users: { select: { nickname: true } },
        restaurants: { select: { restaurantName: true } },
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
      restaurantName: review.restaurants.restaurantName,
      rate: review.rate,
      content: review.content,
      imageUrl: review.imageUrl,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    }));
    return data;
  };

  /* 리뷰 및 평점 상세 조회 */
  readOne = async (reviewId, user) => {
    let data = await this.prisma.reviews.findFirst({
      where: { id: +reviewId, userId: +user.id },
      select: {
        id: true,
        users: { select: { nickname: true } },
        restaurants: { select: { restaurantName: true } },
        rate: true,
        content: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!data) {
      return null;
    }

    data = {
      id: data.id,
      userNickname: data.users.nickname,
      restaurantName: data.restaurants.restaurantName,
      rate: data.rate,
      content: data.content,
      imageUrl: data.imageUrl,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };

    return data;
  };

  /* 리뷰 및 평점 수정 */
  update = async ({userId, reviewId, rate, content, imageUrl}) => {
    const data = await this.prisma.reviews.update({
      where: { id: +reviewId, userId: +userId },
      data: {
        ...(rate && { rate }),
        ...(content && { content }),
        ...(imageUrl && { imageUrl }),
      },
    });
    return data;
  };

  /* 리뷰 및 평점 삭제 */
  delete = async (user, reviewId) => {
    // 리뷰 삭제
    const data = await this.prisma.reviews.delete({
      where: { id: +reviewId, userId: +user.id },
    });
    return { id: data.id };
  };
}
