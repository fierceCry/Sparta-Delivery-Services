import { HTTP_STATUS } from "../constants/http-status.constant.js";

export class OrdersController{
    constructor(orderService){
        this.orderService = orderService;
    }
    customerOrder = async (req, res, next) => {
        try {
            const user = req.user;
            const userId = user.id;
            const {restaurantId, foodId} = req.params;
            const {count} = req.body;

            const orderByCustomer = await this.orderService.orderByCustomer({userId, restaurantId, foodId, count})

            return res.status(HTTP_STATUS.CREATED).json({
                message : "상품이 성공적으로 주문되었습니다."
            })

        } catch (error) {
            next(error);
        }
    }

    bossConfirmOrder = async (req, res, next) => {
        try {
            const user = req.user;
            const userId = user.id;
            const {orderId} = req.params;

            const confirmOrder = this.orderService.confirmOrder({userId, orderId});

            return res.status(HTTP_STATUS).json({
                message: "주문을 수락하였습니다."
            })

        } catch (error) {
            next(error);
        }
    }

    bossDeliveryOrder = async (req, res, next) => {
        try {
            const user = req.user;
            const userId = user.id;
            const {orderId} = req.params;

            const deliveryOrder = this.orderService.deliveryOrder({userId, orderId});

            return res.status(HTTP_STATUS).json({
                message: "배달을 시작하세요."
            })
        } catch (error) {
            next(error);
        }
    }
    bossDeliveryComplete = async (req, res, next) => {
        try {
            const user = req.user;
            const userId = user.id;
            const {orderId} = req.params;

            const deliveryComplete = this.orderService.deliveryComplete({userId, orderId});

            return res.status(HTTP_STATUS).json({
                message: "배달을 완료하셨습니다."
            })
        } catch (error) {
            next(error);
        }
    }
}