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
}
