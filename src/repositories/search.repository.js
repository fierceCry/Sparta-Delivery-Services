export class SearchRepository{
    constructor(prisma){
        this.prisma = prisma;
    }

    searchSystem = async(data) => {
        console.log('hello')
        const findAtFoods = await this.prisma.foods.groupBy({
            by : ['restaurantsId'],
            where : {
                name: {
                    search: `${data}`
                }
            },
            select : {
                restaurantId: true
            }
        });
        const restaurantIds = findAtFoods.map(food => food.restaurantId)
        const findByFoods = await this.prisma.restaurants.findMany({
            where: {
                in: restaurantIds
            }
        });

        const findAtRestaurants = await this.prisma.restaurants.groupBy({
            by : ['restaurantsId'],
            where: {
                OR : [
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
        const findedRestaurants = findAtRestaurants.push(...findByFoods);
        return findedRestaurants;
    }
}