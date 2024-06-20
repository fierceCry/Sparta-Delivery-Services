import bcrypt from 'bcrypt';
import { prisma } from '../src/utils/utils.prisma.js';

const HASH_SALT_ROUNDS = 10; // 해싱에 사용할 솔트(rounds) 수

async function main() {
  const hashedPassword = await bcrypt.hash('123456', HASH_SALT_ROUNDS);

  const user1 = await prisma.users.upsert({
    where: { email: 'sprata@naver.com' },
    update: {},
    create: {
      email: 'sprata@naver.com',
      password: hashedPassword,
      name: 'Alice',
      nickname: 'AliceNickname',
      phoneNumber: '010-1111-2222',
      address: 'Seoul, South Korea',
      emailValidator: true,
    },
  });

  const user2 = await prisma.users.upsert({
    where: { email: 'sprata1@naver.com' },
    update: {},
    create: {
      email: 'sprata1@naver.com',
      password: hashedPassword,
      name: 'Bob',
      nickname: 'BobNickname',
      phoneNumber: '010-3333-4444',
      address: 'Busan, South Korea',
      emailValidator: true,
    },
  });

  const restaurant1 = await prisma.restaurants.upsert({
    where: { bossEmail: 'restaurant1@naver.com' },
    update: {},
    create: {
      bossName: 'Restaurant 1 Owner',
      bossEmail: 'restaurant1@naver.com',
      bossPassword: hashedPassword,
      restaurantName: 'Restaurant 1',
      restaurantAddress: 'Seoul, South Korea',
      restaurantType: 'Korean',
      restaurantPhoneNumber: '010-5555-6666',
      emailValidator: true,
    },
  });

  const restaurant2 = await prisma.restaurants.upsert({
    where: { bossEmail: 'restaurant2@naver.com' },
    update: {},
    create: {
      bossName: 'Restaurant 2 Owner',
      bossEmail: 'restaurant2@naver.com',
      bossPassword: hashedPassword,
      restaurantName: 'Restaurant 2',
      restaurantAddress: 'Busan, South Korea',
      restaurantType: 'Japanese',
      restaurantPhoneNumber: '010-7777-8888',
      emailValidator: true,
    },
  });

  const foods1 = await prisma.foods.create({
    data: {
      restaurantId: restaurant1.id,
      name: '양념치킨 햄버거',
      price: 1,
      imageUrl: { data: 'https://google.com' },
    },
  });

  const foods2 = await prisma.foods.create({
    data: {
      restaurantId: restaurant1.id,
      name: "햄버거 앙념피자",
      price: 2,
      imageUrl: { data: "https://google.com" },
    }
  })

  const foods3 = await prisma.foods.create({
    data: {

      restaurantId: restaurant1.id,
      name: "맛있는 타코야끼",
      price: 2,
      imageUrl: { data: "https://google.com" },
    }
  })

  const foods4 = await prisma.foods.create({
    data: {

      restaurantId: restaurant2.id,
      name: "연어 초밥들",
      price: 2,
      imageUrl: { data: "https://google.com" },
    }
  })

  const foods5 = await prisma.foods.create({
    data: {

      restaurantId: restaurant2.id,
      name: "연어의 롤",
      price: 2,
      imageUrl: { data: 'https://google.com' },
    },
  });

  const order1 = await prisma.orders.create({
    data: {
      userId: user1.id,
      restaurantId: restaurant1.id,
      state: 'DELIVERED',
    },
  });

  const order2 = await prisma.orders.create({
    data: {
      userId: user2.id,
      restaurantId: restaurant2.id,
      state: 'DELIVERED',
    },
  });

  const review1 = await prisma.reviews.create({
    data: {
      rate: "ONE",
      content: "별로에요",
      imageUrl: JSON.stringify(["https://google.com"]), // JSON 형식으로 변환
      users: {
        connect: {
          id: user1.id // 올바른 필드명 사용
        }
      },
      restaurants: {
        connect: {
          id: restaurant1.id // 올바른 필드명 사용
        }
      },
      orders: {
        connect: {
          id: order1.id // 올바른 필드명 사용
        }
      }
    }
  });
  const review2 = await prisma.reviews.create({
    data: {
      rate: "ONE",
      content: "별로에요",
      imageUrl: JSON.stringify(["https://google.com"]), // JSON 형식으로 변환
      users: {
        connect: {
          id: user2.id // 올바른 필드명 사용
        }
      },
      restaurants: {
        connect: {
          id: restaurant2.id // 올바른 필드명 사용
        }
      },
      orders: {
        connect: {
          id: order2.id // 올바른 필드명 사용
        }
      }
    }
  });

  console.log({
    user1,
    user2,
    restaurant1,
    restaurant2,
    foods1,
    foods2,
    review1,
    review2,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
