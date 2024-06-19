import { HTTP_STATUS } from '../constants/http-status.constant.js';

export class RestaurantsController {
  constructor(restaurantsService) {
    this.restaurantsService = restaurantsService;
  }
  getAllRestaurants = async (req, res, next) => {
    try {
      const data = await this.restaurantsService.getAllRestaurants();
      if (!data) {
        throw new Error('데이터가 존재하지않습니다.');
      }
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: '정상적으로 정보조회가 완료되었습니다.', data });
    } catch (err) {
      next(err);
    }
  };

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
      restaurantTotalPrice,
    } = req.body;

    const restaurant = await this.restaurantsService.updateRestaurants(
      id,
      restaurantName,
      restaurantAddress,
      restaurantType,
      restaurantPhoneNumber,
      restaurantTotalPrice
    );

    return res.status(HTTP_STATUS.CREATED).json({
      message: '정상적으로 정보수정이 완료되었습니다.',
      data: restaurant,
    });
  };

  getRankings = async (req, res) => {
    const data = await this.restaurantsService.getRankings();

    return res
      .status(HTTP_STATUS.OK)
      .json({ message: '정상적으로 조회가 완료되었습니다.', data });
  };
}
