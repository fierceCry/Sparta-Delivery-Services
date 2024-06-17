import { RestaurantsRepository } from '../repositories/restaurants.repository.js';

export class RestaurantsService {
  restaurantsRepository = new RestaurantsRepository();
  getRestaurants = async (id) => {
    const restaurants = await this.restaurantsRepository.getRestaurants(id);
    const {
      restaurantName,
      restaurantAddress,
      restaurantType,
      restaurantNumber,
    } = restaurants;
    return {
      id: restaurants.id,
      restaurantName,
      restaurantAddress,
      restaurantType,
      restaurantNumber,
    };
  };
}
