import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { prisma } from '../utils/utils.prisma.js';

export class FoodsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    create = async (data) => {
        return await this.prisma.foods.create({
            data,
        });
    };

    findManyByRestaurant = async (restaurantId) => {
        return await this.prisma.foods.findMany({
            where: { restaurantId: parseInt(restaurantId, 10) },
        });
    };

    //   findOne = async (restaurantId, foodId) => {
    //     return await this.prisma.foods.findUnique({
    //       where: {
    //         id_restaurantId: {
    //           id: foodId,
    //           restaurantId,
    //         },
    //       },
    //     });
    //   };

    update = async (restaurantId, id, data) => {
            // 레코드가 존재하는지 확인
    const food = await this.prisma.foods.findUnique({
        where: {
          id_restaurantId: {
            id: parseInt(id, 10),
            restaurantId: parseInt(restaurantId, 10)
          }
        }
      });
  
      if (!food) {
        throw new Error('없는 음식입니다.');
      }
        return await this.prisma.foods.update({
            where: {
                id_restaurantId: {
                    id: parseInt(id, 10),
                    restaurantId: parseInt(restaurantId, 10)
                },
            },
            data,
        });
    };

    delete = async (restaurantId, foodId) => {
            // 레코드가 존재하는지 확인
    const food = await this.prisma.foods.findUnique({
        where: {
          id_restaurantId: {
            id: parseInt(foodId, 10),
            restaurantId: parseInt(restaurantId, 10)
          }
        }
      });
  
      if (!food) {
        throw new Error('없는 음식입니다');
      }
        return await this.prisma.foods.delete({
            where: {
                id_restaurantId: {
                    id: parseInt(foodId, 10),
                    restaurantId: parseInt(restaurantId, 10),
                },
            },
        });
    };
}
