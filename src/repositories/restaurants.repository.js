import { prisma } from '../utils/utils.prisma.js';

export class RestaurantsRepository {
  getRestaurants = async (id) => {
    const restaurants = await prisma.Restaurants.findFirst({
      where: { id },
    });
    return restaurants;
  };
}
