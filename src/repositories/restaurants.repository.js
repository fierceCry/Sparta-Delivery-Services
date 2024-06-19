export class RestaurantsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  getAllRestaurants = async () => {
    const data = await this.prisma.Restaurants.findMany();

    return data;
  };

  updateRestaurants = async (
    id,
    restaurantName,
    restaurantAddress,
    restaurantType,
    restaurantPhoneNumber,
    restaurantTotalPrice
  ) => {
    const restaurants = await this.prisma.Restaurants.update({
      where: { id },
      data: {
        restaurantName,
        restaurantAddress,
        restaurantType,
        restaurantPhoneNumber,
        restaurantTotalPrice,
      },
    });
    return restaurants;
  };

  getRankings = async () => {
    const restaruantsRanking = await this.prisma.Restaurants.findMany({
      orderBy: {
        restaurantTotalPrice: 'desc', // 오름차순 정렬
      },
    });
    return restaruantsRanking;
  };
}
