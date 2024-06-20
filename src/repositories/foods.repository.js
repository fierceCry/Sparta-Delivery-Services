import { HttpError } from "../errors/http.error.js";

export class FoodsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  create = async ({
    restaurantId,
    name,
    price,
    imageUrl,
  }) => {
    const data = await this.prisma.foods.create({
      data: {
        restaurantId,
        name,
        price,
        imageUrl,
      },
    });
    return data;
  };

  findManyByRestaurant = async (restaurantId) => {
    return await this.prisma.foods.findMany({
      where: { restaurantId: parseInt(restaurantId, 10) },
    });
  };


  findUnique = async ({ where }) => { 
    return await this.prisma.foods.findUnique({
      where: where,
    });
  };

  update = async ({ where, data }) => {
    return await this.prisma.foods.update({
      where: where,
      data: data,
    });
  };

  delete = async (restaurantId, foodId) => {
    // 레코드가 존재하는지 확인
    const food = await this.prisma.foods.findUnique({
      where: {
        id_restaurantId: {
          id: parseInt(foodId, 10),
          restaurantId: parseInt(restaurantId, 10),
        },
      },
    });

    if (!food) {
      throw new HttpError.NotFound('없는 음식입니다');
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
