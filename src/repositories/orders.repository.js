export class OrdersRepository{
    constructor(prisma){
        this.prisma = prisma;
    }

    orderByCustomer = async ({userId, restaurantId, foodId, count}) => {
        return this.prisma.$transaction(async(tx) => {
            const foodPrice = await tx.foods.findUnique({
                where: {
                    id: +foodId,
                    restaurantId: +restaurantId
                },
                select: {
                    foodPrice: true
                }
            });
            
            const order = await tx.orders.create({
                data : {
                    restaurantsId: parseInt(restaurantId),
                    userId: userId,
                    state : 'PENDING'
                }
            });
            const items = new Array();
            const orderItems = items.map(item => {
                return {
                    orderId: order.id,
                    restaurantId: +restaurantId,
                    foodId: +foodId,
                    quantity: count,
                    price: foodPrice,
                    orderPrice: foodPrice.foodPrice*count
                }
            });
            const totalorderItems = await tx.customerordersstorage.createMany({
                data: orderItems
            });
            const userPoints = await tx.users.findUnique({
                where: {
                    id: userId
                },
                select: {
                    points: true
                }
            });
            const ordersPrice = totalorderItems.map(price => {
                return {
                    orderprice: totalorderItems.orderPrice
                }
            });
            return {order, totalorderItems, userPoints, ordersPrice};
        });
    }
    userPointsUpdate = async({userId, userPoints, totalPrice}) => {
        const userPointsUpdate = await this.prisma.users.update({
            where : {
                id: userId
            },
            data : {
                points: userPoints-totalPrice
            }
        })
    }
    confirmOrder = async({userId, orderId}) => {
        const confirmOrder = await this.prisma.orders.update({
            where : {
                id: orderId,
                restaurantId: userId
            },
            data : {
                state: 'PREPARING'
            }
        });
    }
    deliveryOrder = async({userId, orderId}) => {
        const deliveryOrder = await this.prisma.orders.update({
            where : {
                id: orderId,
                restaurantId: userId
            },
            data : {
                state: 'DELIVERING'
            }
        });
    }

    deliveryComplete = async({userId, orderId}) => {
        const deliveryComplete = await this.prisma.orders.upadate({
            where : {
                id: orderId,
                restaurantId: userId
            },
            data: {
                state: 'DELIVERED'
            }
        })
    }
}