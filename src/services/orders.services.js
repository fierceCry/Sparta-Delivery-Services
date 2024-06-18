import { HttpError } from "../errors/http.error.js";

export class OrdersService{
    constructor(ordersRepository){
        this.ordersRepository = ordersRepository;
    }

    orderByCustomer = async ({userId, restaurantId, foodId, count}) => {
        return this.ordersRepository.$transaction(async(tx) => {
            const customerOrder = await tx.orderByCustomer({userId, restaurantId, foodId, count});
            let totalPrice = 0;
            await ordersPrice.forEach(price => {
                totalPrice += price;
            });
            if(totalPrice>userPoints){
                throw new HttpError.Conflict("잔액이 부족합니다.");
            }
            const userPointsUpdate = await tx.userPointsUpdate({userId, userPoints, totalPrice});
            return {customerOrder, userPointsUpdate};
        });
    }

    confirmOrder = async({userId, orderId}) => {
        const confirmOrder = this.ordersRepository.confirmOrder({userId, orderId});
        if(!userId){
            throw new HttpError.NotFound("인증정보가 유효하지 않습니다.");
        }
        return confirmOrder;
    }

    deliveryOrder = async({userId, orderId}) => {
        const deliveryOrder = this.ordersRepository.deliveryOrder({userId, orderId});
        if(!userId){
            throw new HttpError.NotFound("인증정보가 유효하지 않습니다.");
        }
        return deliveryOrder;
    }

    deliveryComplete = async({userId, orderId}) => {
        const deliveryComplete = this.ordersRepository.deliveryComplete({userId, orderId});
        if(!userId){
            throw new HttpError.NotFound("인증정보가 유효하지 않습니다.");
        }
        return deliveryComplete;
    }
}