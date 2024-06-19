export class RestaurantsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  updateRestaurants = async (
    id,
    restaurantName,
    restaurantAddress,
    restaurantType,
    restaurantPhoneNumber
  ) => {
    const restaurants = await this.prisma.Restaurants.update({
      where: { id },
      data: {
        restaurantName,
        restaurantAddress,
        restaurantType,
        restaurantPhoneNumber,
        updatedAt: new Date(),
      },
    });
    return restaurants;
  };

  getRankings = async() => {
    const restaruantsRanking = await this.prisma.Restaurants.findMany({
      orderBy: {
        restaurantTotalPrice: 'asc' // 오름차순 정렬
      }
    })
    return restaruantsRanking
  }
}
