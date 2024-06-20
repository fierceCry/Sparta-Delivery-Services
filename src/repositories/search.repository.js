export class SearchRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  searchSystem = async (data) => {
    const findAtFoods = await this.prisma.foods.groupBy({
      by: ['restaurantId'],
      where: {
        name: {
          search: `${data}`,
        },
      },
    });
    console.log('');
    console.log(findAtFoods);
    console.log('');
    const restaurantIds = findAtFoods.map((food) => food.restaurantId);
    console.log('');
    console.log(restaurantIds);
    console.log('');
    // const findByFoods = await this.prisma.restaurants.findMany({
    //     where: {
    //         id: restaurantIds
    //     }
    // });
    // console.log("");
    // console.log(findByFoods);
    // console.log("");

    const findAtRestaurants = await this.prisma.restaurants.groupBy({
      by: ['id'],
      where: {
        OR: [
          {
            restaurantName: {
              search: `${data}`,
            },
          },
          {
            restaurantAddress: {
              search: `${data}`,
            },
          },
          {
            restaurantType: {
              search: `${data}`,
            },
          },
        ],
      },
    });
    console.log(findAtRestaurants);
    const findedRestaurants = findAtRestaurants.push(...findByFoods);
    return findedRestaurants;
  };
}
