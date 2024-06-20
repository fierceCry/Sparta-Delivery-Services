import { HttpError } from '../errors/http.error.js';
import { uploadImageS3 } from '../services/s3.services.js';

export class FoodsService {
  constructor(foodsRepository) {
    this.foodsRepository = foodsRepository;
  }

  create = async ({ restaurantId, name, images }, price) => {
    if (images.length === 0) {
      throw new HttpError.NotFound('이미지가 업로드되지 않았습니다.');
    }

    // 이미지 S3 업로드 및 URL 생성
    const imageUrl = await Promise.all(
      images.map((image) => uploadImageS3(image))
    );
    const data = await this.foodsRepository.create({
      restaurantId: parseInt(restaurantId, 10),
      name,
      price: parseInt(price, 10),
      imageUrl: imageUrl,
    });
    return data;
  };

  getFoodsByRestaurant = async (restaurantId) => {
    if(!restaurantId){
      throw new HttpError.BadRequest('없는 음식점 입니다.')
    }
    return await this.foodsRepository.findManyByRestaurant(restaurantId);
  };

  update = async ({ restaurantId, foodId, name, images }, price) => {
    const parsedRestaurantId = parseInt(restaurantId, 10);
    const parsedFoodId = parseInt(foodId, 10);

    // 레코드가 존재하는지 확인
    const food = await this.foodsRepository.findUnique({
      where: {
        id_restaurantId: {
          id: parsedFoodId,
          restaurantId: parsedRestaurantId,
        },
      },
    });

    if (!food) {
      throw new HttpError.NotFound('없는 음식입니다.');
    }

    const imageUrl = await Promise.all(
      images.map((image) => uploadImageS3(image))
    );

    const data = await this.foodsRepository.update({
      where: {
        id_restaurantId: {
          id: parsedFoodId,
          restaurantId: parsedRestaurantId,
        },
      },
      data: {
        name,
        price: parseInt(price, 10),
        imageUrl: imageUrl,
      },
    });
    return data;
  };

  deleteFood = async (restaurantId, foodId) => {
    if(!restaurantId){
      throw new HttpError.BadRequest('없는 음식점 입니다.');
    }else if(!foodId){
      throw new HttpError.BadRequest('없는 메뉴입니다.');
    }
    return await this.foodsRepository.delete(restaurantId, foodId);
  };
}
