export class OrdersService{
    constructor(ordersRepository){
        this.ordersRepository = ordersRepository;
    }

    addToCart= async ({userId, restaurantId, foodId, count}) => {
            const addToCart = await this.ordersRepository.addToCart({userId, restaurantId, foodId, count});
    }

    createOrderFromCart = async ({userId, restaurantId}) => {
        return await this.ordersRepository.createOrderFromCart({userId, restaurantId});
    }


    confirmOrder = async({restaurantId, orderId}) => {
        const bossConfirmOrder = await this.ordersRepository.confirmOrder({restaurantId, orderId});
        return bossConfirmOrder;
    }

    deliveryOrder = async({restaurantId, orderId}) => {
        const deliveryOrder = await this.ordersRepository.deliveryOrder({restaurantId, orderId});
        return deliveryOrder;
    }

    deliveryComplete = async({restaurantId, orderId}) => {
        const deliveryComplete = await this.ordersRepository.deliveryComplete({restaurantId, orderId});
        return deliveryComplete;
    }
}