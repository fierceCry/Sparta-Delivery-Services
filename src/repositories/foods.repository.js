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
      where: { restaurantId },
    });
  };

  findOne = async (restaurantId, foodId) => {
    return await this.prisma.foods.findUnique({
      where: {
        id_restaurantId: {
          id: foodId,
          restaurantId,
        },
      },
    });
  };

  update = async (restaurantId, foodId, data) => {
    return await this.prisma.foods.update({
      where: {
        id_restaurantId: {
          id: foodId,
          restaurantId,
        },
      },
      data,
    });
  };

  delete = async (restaurantId, foodId) => {
    return await this.prisma.foods.delete({
      where: {
        id_restaurantId: {
          id: foodId,
          restaurantId,
        },
      },
    });
  };
}
