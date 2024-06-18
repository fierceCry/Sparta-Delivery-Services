import { RestaurantsRepository } from '../repositories/restaurants.repository.js';

export class RestaurantsService {
  restaurantsRepository = new RestaurantsRepository();
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
      updatedAt: new Date(),
    };
  };
}
