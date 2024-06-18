import { prisma } from '../utils/utils.prisma.js';

export class RestaurantsRepository {
  updateRestaurants = async (
    id,
    restaurantName,
    restaurantAddress,
    restaurantType,
    restaurantNumber
  ) => {
    const restaurants = await prisma.Restaurants.update({
      where: { id },
      data: {
        restaurantName,
        restaurantAddress,
        restaurantType,
        restaurantNumber,
      },
    });
    return restaurants;
  };
}
