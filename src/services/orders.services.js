import { HttpError } from "../errors/http.error.js";

export class OrdersService{
    constructor(ordersRepository){
        this.ordersRepository = ordersRepository;
    }

    addToCart= async ({userId, restaurantId, foodId, count}) => {
            const addToCart = await this.ordersRepository.addToCart({userId, restaurantId, foodId, count});
            if(!userId){
                throw new HttpError.NotFound("인증정보가 유효하지 않습니다.");
            }
    };

    createOrderFromCart = async ({userId, restaurantId}) => {
        const createOrderFromCart = await this.ordersRepository.createOrderFromCart({userId, restaurantId});
        if(!userId){
            throw new HttpError.NotFound("인증정보가 유효하지 않습니다.");
        }
    }


    confirmOrder = async({userId}) => {
        const bossConfirmOrder = await this.ordersRepository.confirmOrder({userId});
        if(!userId){
            throw new HttpError.NotFound("인증정보가 유효하지 않습니다.");
        }
        return bossConfirmOrder;
    }

//     deliveryOrder = async({userId, orderId}) => {
//         const deliveryOrder = await this.ordersRepository.deliveryOrder({userId, orderId});
//         if(!userId){
//             throw new HttpError.NotFound("인증정보가 유효하지 않습니다.");
//         }
//         return deliveryOrder;
//     }

//     deliveryComplete = async({userId, orderId}) => {
//         const deliveryComplete = await this.ordersRepository.deliveryComplete({userId, orderId});
//         if(!userId){
//             throw new HttpError.NotFound("인증정보가 유효하지 않습니다.");
//         }
//         return deliveryComplete;
//     }
}