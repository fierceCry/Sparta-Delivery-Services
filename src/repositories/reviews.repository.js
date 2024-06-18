export class ReviewsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  /* 리뷰 및 평점 생성 */

  /*주문 조회*/
  findOrderById = async (customerordersstorageId, userId) => {
    const order = await this.prisma.customer_orders_storage.findUnique({
      where: { id: +customerordersstorageId },
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
    customerordersstorageId,
    rate,
    content,
    imageUrl,
  }) => {
    const data = await this.prisma.reviews.create({
      data: {
        userId,
        restaurantId,
        customerordersstorageId,
        rate,
        content,
        imageUrl,
      },
    });
    return data;
  };

  /* 리뷰 및 평점 목록 조회 */
  readMany = async (user, sort) => {
    //리뷰 목록 정렬
    const sortOrder = sort.toLowerCase() === 'asc' ? 'asc' : 'desc';

    const reviews = await this.prisma.reviews.findMany({
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
    return data;
  };

  /* 리뷰 및 평점 상세 조회 */
  readOne = async (user, reviewId) => {
    const data = await this.prisma.reviews.findFirst({
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
      return null;
    }
    return data;
  };

  /* 리뷰 및 평점 수정 */
  update = async (user, reviewId, rate, content, imageUrl) => {
    const data = await this.prisma.reviews.update({
      where: { id: +reviewId, userId: user.id },
      data: {
        ...(rate && { rate }),
        ...(content && { content }),
        ...(imageUrl && { imageUrl }),
      },
    });
    return data;
  };

  /* 리뷰 및 평점 목록 삭제 */
  delete = async (userId, reviewId) => {
    //리뷰 삭제
    const data = await prisma.reviews.delete({
      where: { id: +reviewId, userId: +userId },
    });
    return { id: data.id };
  };
}
