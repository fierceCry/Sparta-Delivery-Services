import { HTTP_STATUS } from '../constants/http-status.constant.js';

export class OrdersController {
  constructor(orderService) {
    this.orderService = orderService;
  }
  // 음식 상세 페이지에서 주문하기 버튼을 눌러 카트에 담기.
  addToCart = async (req, res, next) => {
    try {
      const user = req.user;
      const userId = user.id;
      const { restaurantId, foodId } = req.params;
      const { count } = req.body;

      const addToCart = await this.orderService.addToCart({
        userId,
        restaurantId,
        foodId,
        count,
      });

      return res.status(HTTP_STATUS.CREATED).json({
        message: '상품이 성공적으로 담겼습니다.',
      });
    } catch (error) {
      next(error);
    }
  };

  // 카트에 담은 것들 주문하기
  createOrderFromCart = async (req, res, next) => {
    try {
      const user = req.user;
      const userId = user.id;
      const { restaurantId } = req.params;
      const createOrderFromCart = await this.orderService.createOrderFromCart({
        userId,
        restaurantId,
      });

      return res.status(HTTP_STATUS.CREATED).json({
        message: '주문이 성공적으로 처리되었습니다.',
      });
    } catch (error) {
      next(error);
    }
  };

  bossConfirmOrder = async (req, res, next) => {
    try {
      const user = req.user;
      const restaurantId = user.id;
      const { orderId } = req.params;
      const confirmOrder = await this.orderService.confirmOrder({
        restaurantId,
        orderId,
      });

      return res.status(HTTP_STATUS.CREATED).json({
        message: '주문을 수락하였습니다.',
      });
    } catch (error) {
      next(error);
    }
  };

  bossDeliveryOrder = async (req, res, next) => {
    try {
      const user = req.user;
      const restaurantId = user.id;
      const { orderId } = req.params;

      const deliveryOrder = await this.orderService.deliveryOrder({
        restaurantId,
        orderId,
      });

      return res.status(HTTP_STATUS.CREATED).json({
        message: '배달을 시작하세요.',
      });
    } catch (error) {
      next(error);
    }
  };
  bossDeliveryComplete = async (req, res, next) => {
    try {
      const user = req.user;
      const restaurantId = user.id;
      const { orderId } = req.params;

      const deliveryComplete = this.orderService.deliveryComplete({
        restaurantId,
        orderId,
      });

      return res.status(HTTP_STATUS.CREATED).json({
        message: '배달을 완료하셨습니다.',
      });
    } catch (error) {
      next(error);
    }
  };
}
