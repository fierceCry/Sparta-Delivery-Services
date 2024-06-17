import { RestaurantsRepository } from '../repositories/restaurants.repository.js';

export class RestaurantsService {
  restaurantsRepository = new RestaurantsRepository();
  updateRestaurants = async (
    id,
    restaurantName,
    restaurantAddress,
    restaurantType,
    restaurantNumber
  ) => {
    const restaurants = await this.restaurantsRepository.updateRestaurants(
      id,
      restaurantName,
      restaurantAddress,
      restaurantType,
      restaurantNumber
    );
    return {
      id: restaurants.id,
      restaurantName: restaurants.restaurantName,
      restaurantAddress: restaurants.restaurantAddress,
      restaurantType: restaurants.restaurantType,
      restaurantNumber: restaurants.restaurantNumber,
    };
  };
}
