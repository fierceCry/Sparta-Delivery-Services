import { HTTP_STATUS } from '../constants/http-status.constant.js';

export class FoodsController {
  constructor(foodService) {
    this.foodService = foodService;
  }

  //메뉴 생성
  create = async (req, res, next) => {
    try {
      const { name, price, imageUrl } = req.body;
      const restaurantId = req.user.id;

      const createdFood = await this.foodService.createFood({
        restaurantId,
        name,
        price,
        imageUrl,
      });

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: '메뉴 생성완료!',
        data: createdFood,
      });
    } catch (error) {
      next(error);
    }
  };
  // 메뉴 조회
  readMany = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const foods = await this.foodService.getFoodsByRestaurant(restaurantId);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        data: foods,
      });
    } catch (error) {
      next(error);
    }
  };

  // 메뉴 상세 조회
  // readOne = async (req, res, next) => {
  //   try {
  //     const { restaurantId, foodId } = req.params;
  //     const food = await this.foodService.getFoodById(restaurantId, foodId);
  //     if (!food) {
  //       throw new HttpError.NotFound('없는 음식입니다.');
  //     }
  //     return res.status(HTTP_STATUS.OK).json({
  //       status: HTTP_STATUS.OK,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // 메뉴 수정
  update = async (req, res, next) => {
    try {
      const { restaurantId, foodId } = req.params;
      const { name, price, imageUrl } = req.body;
      const updatedFood = await this.foodService.updateFood(
        parseInt(restaurantId, 10),
        parseInt(foodId, 10),
        { name, price, imageUrl }
      );

      if (!updatedFood) {
        throw new HttpError.NotFound('없는 음식입니다.');
      }

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '메뉴 수정완료!',
        data: updatedFood,
      });
    } catch (error) {
      next(error);
    }
  };

  // 메뉴 삭제
  delete = async (req, res, next) => {
    try {
      const { restaurantId, foodId } = req.params;
      const deletedFood = await this.foodService.deleteFood(
        parseInt(restaurantId, 10),
        parseInt(foodId, 10)
      );

      if (!deletedFood) {
        throw new HttpError.NotFound('없는 음식입니다.');
      }

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '삭제 완료',
        data: { id: deletedFood.id },
      });
    } catch (error) {
      next(error);
    }
  };
}
