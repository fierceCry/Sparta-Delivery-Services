export class SearchRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async searchSystem(data) {
        // 음식과 레스토랑에서 검색된 모든 레스토랑 ID 가져오기
        const [foodsResult, restaurantsResult] = await Promise.all([
            this.searchFoods(data),
            this.searchRestaurants(data),
        ]);

        // 중복 제거된 레스토랑 ID 목록
        const uniqueRestaurantIds = new Set([
            ...foodsResult.map(food => food.restaurantId),
            ...restaurantsResult.map(restaurant => restaurant.id),
        ]);

        // 중복이 제거된 레스토랑 ID 목록으로 레스토랑 상세 정보 조회
        const restaurants = uniqueRestaurantIds.size > 0
            ? await this.prisma.restaurants.findMany({
                where: {
                    id: { in: [...uniqueRestaurantIds] }
                },
                select: {
                    id: true,
                    bossName: true,
                    bossEmail: true,
                    restaurantName: true,
                    restaurantAddress: true,
                    restaurantType: true,
                    restaurantPhoneNumber: true
                }
            })
            : [];

        return restaurants;
    }

    async searchFoods(data) {
        const findAtFoods = await this.prisma.foods.groupBy({
            by: ['restaurantId'],
            where: {
                name: { contains: data }
            }
        });

        return findAtFoods;
    }

    async searchRestaurants(data) {
        const findAtRestaurants = await this.prisma.restaurants.groupBy({
            by: ['id'],
            where: {
                OR: [
                    { restaurantName: { contains: data } },
                    { restaurantAddress: { contains: data } },
                    { restaurantType: { contains: data } },
                ]
            }
        });

        return findAtRestaurants;
    }
}
