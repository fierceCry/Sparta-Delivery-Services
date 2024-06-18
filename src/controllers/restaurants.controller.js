import { RestaurantsService } from '../services/restaurants.services.js';

export class RestaurantsController {
  restaurantsService = new RestaurantsService();
  getRestaurants = async (req, res) => {
    const restaurants = req.user;

    return res.status(200).json({
      message: '정상적으로 정보조회가 완료되었습니다.',
      data: restaurants,
    });
  };

  updateRestaurants = async (req, res) => {
    const { id } = req.user;
    const {
      restaurantName,
      restaurantAddress,
      restaurantType,
      restaurantNumber,
    } = req.body;

    const restaurants = await this.restaurantsService.updateRestaurants(
      id,
      restaurantName,
      restaurantAddress,
      restaurantType,
      restaurantNumber
    );

    return res.status(201).json({
      message: '정상적으로 정보수정이 완료되었습니다.',
      data: restaurants,
    });
  };
}
