import { getSort, RANKINGLIMIT, SORT } from '../constants/restaurants.constants.js';
import { HttpError } from '../errors/http.error.js';

export class RestaurantsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  getAllRestaurants = async () => {
    return await this.prisma.Restaurants.findMany();
  };

  updateRestaurants = async (
    id,
    restaurantName,
    restaurantAddress,
    restaurantType,
    restaurantPhoneNumber
  ) => {
    return await this.prisma.Restaurants.update({
      where: { id },
      data: {
        restaurantName,
        restaurantAddress,
        restaurantType,
        restaurantPhoneNumber,
      },
    });
  };

  getRankings = async (sortToLower, limit = RANKINGLIMIT) => {
    if (getSort(sortToLower)) {
      const restaruantsRanking = await this.prisma.Restaurants.findMany({
        orderBy: {
          [getSort(sortToLower)]: SORT.GET_SORT,
        },
        take: limit,
      });
      return restaruantsRanking;
    } else {
      throw new HttpError.BadRequest(`Unsupported sorting option: ${sortToLower}`);
    }
  };
}
