import { HttpError } from "../errors/http.error.js";

export class OrdersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

    // 음식 상세페이지에서 주문하기 버튼으로 카트에 담고 주문테이블 생성하는 기능
    addToCart = async ({ userId, restaurantId, foodId, count }) => {
        const food = await this.prisma.foods.findUnique({
            where: {
                id: +foodId
            }
        });
        if (!food) {
            throw new HttpError.NotFound('존재하지 않는 음식')
        }
        let order = await this.prisma.orders.findFirst({
            where: {
                userId: +userId,
                restaurantId: +restaurantId,
                state: 'CART'
            }
        });
        if (!order) {
            await this.prisma.orders.create({
                data: {
                    userId: userId,
                    restaurantId: +restaurantId,
                    state: 'CART'
                }
            });
        }
        order = await this.prisma.orders.findFirst({
            where: {
                userId: +userId,
                restaurantId: +restaurantId,
                state: 'CART'
            }
        });
        const cartItems = await this.prisma.customerOrdersStorage.create({
            data: {
                foodPrice: food.price,
                quantity: +count,
                orderPrice: food.price * +count,
                order: {
                    connect: {
                        id: order.id
                    }
                },
                food: {
                    connect: {
                        id: +foodId
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
                },
                restaurant: {
                    connect: {
                        id: +restaurantId
                    }
                }
            }
        });
    }

  // 카트에 담긴 상품을 주문하기를 눌렀을때 기능

  createOrderFromCart = async ({ userId, restaurantId }) => {
    return await this.prisma.$transaction(async (tx) => {
      // 1. 카트 가져오기
      const order = await tx.orders.findFirst({
        where: {
          userId: userId,
          restaurantId: +restaurantId,
          state: 'CART'
        }
      });
  
      if (!order) {
        throw new Error('No cart found');
      }
  
      const cart = await tx.customerOrdersStorage.findMany({
        where: {
          ordersId: order.id
        }
      });
  
      if (!cart || cart.length === 0) {
        throw new Error('Cart is empty');
      }
  
      // 2. 주문상태로 변경하고 결제 처리하기
      const userPoints = await tx.users.findUnique({
        where: {
          id: userId
        },
        select: {
          points: true
        }
      });
  
      let cartsPrice = await tx.customerOrdersStorage.findMany({
        where: {
          ordersId: order.id
        },
        select: {
          orderPrice: true
        }
      });
  
      cartsPrice = cartsPrice.map(price => price.orderPrice);
      let totalPrice = 0;
      cartsPrice.forEach(price => {
        totalPrice += price;
      });
  
      if (totalPrice > userPoints.points) {
        throw new Error('보유잔액이 모자랍니다.');
      }
  
      const updateOrder = await tx.orders.update({
        where: {
          id: order.id
        },
        data: {
          state: 'PENDING'
        }
      });
  
      await tx.users.update({
        where: {
          id: userId
        },
        data: {
          points: userPoints.points - totalPrice
        }
      });
  
      return order; // 반환할 값을 명시적으로 지정
    });
  }
  
  confirmOrder = async ({ restaurantId, orderId }) => {
    const confirmOrder = await this.prisma.orders.update({
      where: {
        id: +orderId,
        restaurantId: restaurantId,
        state: 'PENDING',
      },
      data: {
        state: 'PREPARING',
      },
    });
  };
  
  deliveryOrder = async ({ restaurantId, orderId }) => {
    return await this.prisma.orders.update({
      where: {
        id: +orderId,
        restaurantId: restaurantId,
        state: 'PREPARING',
      },
      data: {
        state: 'DELIVERING',
      },
    });
  };

  deliveryComplete = async ({ restaurantId, orderId }) => {
    return await this.prisma.orders.update({
      where: {
        id: +orderId,
        restaurantId: restaurantId,
        state: 'DELIVERING',
      },
      data: {
        state: 'DELIVERED',
      },
    });
  };

  findById = async(id)=>{
    return await this.prisma.customerOrdersStorage.findFirst({
        where: {ordersId: +id}
    })
  }

  findOrderById = async(customerordersstorageId, userId)=>{
    return await this.prisma.customerOrdersStorage.findFirst({
      where: {
        id: +customerordersstorageId,
        userId
      }
    })
  }
}