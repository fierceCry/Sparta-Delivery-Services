import { RestaurantsService } from '../services/restaurants.services.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';

export class RestaurantsController {
  restaurantsService = new RestaurantsService();
  getRestaurants = async (req, res) => {
    const restaurant = req.user;

    const data = { ...restaurant, bossPassword: undefined };

    return res.status(HTTP_STATUS.OK).json({
      message: '정상적으로 정보조회가 완료되었습니다.',
      data,
    });
  };

  updateRestaurants = async (req, res) => {
    const { id } = req.user;
    const {
      restaurantName,
      restaurantAddress,
      restaurantType,
      restaurantPhoneNumber,
    } = req.body;

    const restaurant = await this.restaurantsService.updateRestaurants(
      id,
      restaurantName,
      restaurantAddress,
      restaurantType,
      restaurantPhoneNumber
    );

    return res.status(HTTP_STATUS.CREATED).json({
      message: '정상적으로 정보수정이 완료되었습니다.',
      data: restaurant,
    });
  };
}
