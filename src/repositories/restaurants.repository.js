import { getSort, RANKINGLIMIT } from '../constants/restaurants.constants.js';

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
    restaurantPhoneNumber
  ) => {
    const restaurants = await this.prisma.Restaurants.update({
      where: { id },
      data: {
        restaurantName,
        restaurantAddress,
        restaurantType,
        restaurantPhoneNumber,
      },
    });
    return restaurants;
  };

  getRankings = async (sortToLower, limit = RANKINGLIMIT) => {
    if (getSort(sortToLower)) {
      const restaruantsRanking = await this.prisma.Restaurants.findMany({
        orderBy: {
          [getSort(sortToLower)]: 'desc',
        },
        take: limit,
      });
      return restaruantsRanking;
    } else {
      throw new Error(`Unsupported sorting option: ${sortToLower}`);
    }
  };
}
