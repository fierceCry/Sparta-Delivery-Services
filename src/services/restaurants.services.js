export class RestaurantsService {
  constructor(restaurantsRepository) {
    this.restaurantsRepository = restaurantsRepository;
  }
  getAllRestaurants = async () => {
    const data = await this.restaurantsRepository.getAllRestaurants();
    if (!data) {
      throw new HttpError.NotFound('데이터가 존재하지않습니다.');
    }
    return data;
  };

  updateRestaurants = async (
    id,
    restaurantName,
    restaurantAddress,
    restaurantType,
    restaurantPhoneNumber
  ) => {
    const restaurants = await this.restaurantsRepository.updateRestaurants(
      id,
      restaurantName,
      restaurantAddress,
      restaurantType,
      restaurantPhoneNumber
    );
    return {
      ...restaurants,
      bossPassword: _,
    };
  };

  getRankings = async (sort) => {
    const sortToLower = sort.toLowerCase();
    const restaruantsRanking =
      await this.restaurantsRepository.getRankings(sortToLower);

    const data = restaruantsRanking.map((el) => ({
      restaurantName: el.restaurantName,
      restaurantAddress: el.restaurantAddress,
      restaurantPhoneNumber: el.restaurantPhoneNumber,
      restaurantTotalPrice: el.restaurantTotalPrice,
      restaurantRatingAvg: el.restaurantRatingAvg,
    }));
    return data;
  };
}
