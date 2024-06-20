export class ReviewsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  /* 리뷰 및 평점 생성 */
  create = async ({
    userId,
    restaurantId,
    customerordersstorageId,
    rate,
    content,
    imageUrl,
  }) => {
    const data = await this.prisma.reviews.create({
      data: {
        userId,
        restaurantId,
        customerordersstorageId: +customerordersstorageId,
        rate,
        content,
        imageUrl: JSON.stringify(imageUrl),
      },
    });
    //전수원 24-06-20 추가
    const findRate = await this.prisma.reviews.findMany({
      where: { restaurantId },
      select: {
        rate: true,
      },
    });

    const reviewsRate = await findRate.map((el) => el.rate);
    let totalRate = 0;
    const reviewsTotalRate = await reviewsRate.forEach((rate) => {
      totalRate += rate;
    });
    const reviewsAvgRate = reviewsTotalRate / (reviewsRate.length - 1);

    await this.prisma.restaurants.update({
      where: { restaurantId },
      data: {
        restaurantRatingAvg: reviewsAvgRate,
      },
    });
    //전수원 24-06-20 추가
    return data;
  };

  /* 리뷰 및 평점 목록 조회 */
  readMany = async (user) => {
    const reviews = await this.prisma.reviews.findMany({
      where: { userId: +user.id },
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

    // 출력 내용
    const data = reviews.map((review) => {
      let imageUrl;
      try {
        imageUrl = JSON.parse(review.imageUrl);
      } catch (e) {
        imageUrl = review.imageUrl;
      }
      return {
        userNickname: review.users.nickname,
        restaurantName: review.restaurants.restaurantName,
        rate: review.rate,
        content: review.content,
        imageUrl,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
      };
    });
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

    let imageUrl;
    try {
      imageUrl = JSON.parse(data.imageUrl);
    } catch (e) {
      imageUrl = data.imageUrl;
    }

    data = {
      id: data.id,
      userNickname: data.users.nickname,
      restaurantName: data.restaurants.restaurantName,
      rate: data.rate,
      content: data.content,
      imageUrl: imageUrl,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };

    return data;
  };

  /* 리뷰 및 평점 수정 */
  update = async (user, reviewId, updateData) => {
    const { rate, content, imageUrl } = updateData;

    const data = await this.prisma.reviews.update({
      where: { id: +reviewId, userId: +user.id },
      data: {
        ...(rate && { rate }),
        ...(content && { content }),
        ...(imageUrl && { imageUrl: JSON.stringify(imageUrl) }),
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
