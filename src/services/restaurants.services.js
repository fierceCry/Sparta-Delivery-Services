export class RestaurantsService {
  constructor(restaurantsRepository) {
    this.restaurantsRepository = restaurantsRepository;
  }
  getAllRestaurants = async () => {
    const data = await this.restaurantsRepository.getAllRestaurants();

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
    const restaurants = await this.restaurantsRepository.updateRestaurants(
      id,
      restaurantName,
      restaurantAddress,
      restaurantType,
      restaurantPhoneNumber,
      restaurantTotalPrice
    );
    return {
      ...restaurants,
      bossPassword: undefined,
    };
  };

  updateRestaurantsTotalPrice = async () => {
    const findAllRestaruants =
      await this.restaurantsRepository.getAllRestaurants();
    const findById = findAllRestaruants.map((el) => ({
      id: el.id,
    }));
    const findOrderPirce = this.restaurantsRepository.findOrderPrice();

    return null;
  };

  getRankings = async () => {
    const restaruantsRanking = await this.restaurantsRepository.getRankings();

    const data = restaruantsRanking.map((el) => ({
      restaurantName: el.restaurantName,
      restaurantAddress: el.restaurantAddress,
      restaurantPhoneNumber: el.restaurantPhoneNumber,
      restaurantTotalPrice: el.restaurantTotalPrice,
    }));
    return data;
  };
}
