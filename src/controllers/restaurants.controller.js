import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { SORT } from '../constants/restaurants.constants.js';

export class RestaurantsController {
  constructor(restaurantsService) {
    this.restaurantsService = restaurantsService;
  }
  //가게전체조회
  getAllRestaurants = async (req, res, next) => {
    try {
      const data = await this.restaurantsService.getAllRestaurants();

      return res
        .status(HTTP_STATUS.OK)
        .json({ message: '정상적으로 정보조회가 완료되었습니다.', data: data });
    } catch (err) {
      next(err);
    }
  };
  //가게상세조회
  getRestaurants = async (req, res) => {
    const restaurant = req.user;

    const data = { ...restaurant, bossPassword: _ };

    return res.status(HTTP_STATUS.OK).json({
      message: '정상적으로 정보조회가 완료되었습니다.',
      data: data,
    });
  };

  //가게정보수정
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

  //가게랭킹조회(최대5개)
  getRankings = async (req, res) => {
    const { sort = SORT.GET_RANKINGS } = req.body;

    const data = await this.restaurantsService.getRankings(sort);

    return res
      .status(HTTP_STATUS.OK)
      .json({ message: '정상적으로 조회가 완료되었습니다.', data: data });
  };
}
