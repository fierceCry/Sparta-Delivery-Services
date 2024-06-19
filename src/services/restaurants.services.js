export class RestaurantsService {
  constructor(restaurantsRepository) {
    this.restaurantsRepository = restaurantsRepository;
  }
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
      bossPassword: undefined,
    };
  };

  getRankings = async()=>{
    const data = this.restaurantsRepository.getRankings()

    return data
}
}
