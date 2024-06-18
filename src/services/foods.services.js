import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { prisma } from '../utils/utils.prisma.js';

export class FoodsService {
  constructor(foodsRepository) {
    this.foodsRepository = foodsRepository;
  }

  createFood = async (data) => {
    return await this.foodsRepository.create(data);
  };

  getFoodsByRestaurant = async (restaurantId) => {
    return await this.foodsRepository.findManyByRestaurant(restaurantId);
  };

  //   getFoodById = async (restaurantId, foodId) => {
  //     return await this.foodsRepository.findOne(restaurantId, foodId);
  //   };

  updateFood = async (restaurantId, foodId, data) => {
    return await this.foodsRepository.update(restaurantId, foodId, data);
  };

  deleteFood = async (restaurantId, foodId) => {
    return await this.foodsRepository.delete(restaurantId, foodId);
  };
}
