export class SearchRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    searchSystem = async (data) => {
        // 음식 테이블에서 검색하여 레스토랑 ID를 그룹화
        const findAtFoods = await this.prisma.foods.groupBy({
            by: ['restaurantId'],
            where: {
                name: {
                    search: `${data}`
                }
            }
        });
        console.log({ data, findAtFoods });

        // 음식에서 검색된 레스토랑 ID 목록
        let restaurantIdsFromFoods = findAtFoods.map(food => food.restaurantId);

        // 레스토랑 테이블에서 검색하여 레스토랑 ID를 그룹화
        const findAtRestaurants = await this.prisma.restaurants.groupBy({
            by: ['id'],
            where: {
                OR: [
                    {
                        restaurantName: {
                            search: `${data}`
                        }
                    },
                    {
                        restaurantAddress: {
                            search: `${data}`
                        }
                    },
                    {
                        restaurantType: {
                            search: `${data}`
                        }
                    },
                ]
            }
        });
        console.log(findAtRestaurants);
        // 레스토랑에서 검색된 레스토랑 ID 목록
        let restaurantIdsFromRestaurants = findAtRestaurants.map(restaurant => restaurant.id);

        // 두 검색 결과에서 얻은 레스토랑 ID를 합치고 중복 제거
        let uniqueRestaurantIds = [...new Set([...restaurantIdsFromFoods, ...restaurantIdsFromRestaurants])];

        // 중복이 제거된 레스토랑 ID 목록으로 레스토랑 상세 정보 조회
        const restaurants = uniqueRestaurantIds.length > 0
            ? await this.prisma.restaurants.findMany({
                where: {
                    id: { in: uniqueRestaurantIds }
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

        console.log(restaurants);
        return restaurants;
    }
}