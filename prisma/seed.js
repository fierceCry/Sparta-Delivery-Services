import bcrypt from 'bcrypt';
import { prisma } from '../src/utils/utils.prisma.js';

const HASH_SALT_ROUNDS = 10; // 해싱에 사용할 솔트(rounds) 수

async function main() {
  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash('123456', HASH_SALT_ROUNDS);

  // 사용자 생성 또는 업데이트
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

  // 레스토랑 생성 또는 업데이트
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

  // 음식 데이터 생성
  const foodsData = [
    { restaurantId: restaurant1.id, name: '양념치킨 햄버거', price: 10000, imageUrl: { url: 'https://example.com/food1.jpg' } },
    { restaurantId: restaurant1.id, name: '햄버거 양념피자', price: 15000, imageUrl: { url: 'https://example.com/food2.jpg' } },
    { restaurantId: restaurant1.id, name: '맛있는 타코야끼', price: 8000, imageUrl: { url: 'https://example.com/food3.jpg' } },
    { restaurantId: restaurant1.id, name: '불고기 버거', price: 12000, imageUrl: { url: 'https://example.com/food4.jpg' } },
    { restaurantId: restaurant2.id, name: '연어 초밥', price: 20000, imageUrl: { url: 'https://example.com/food5.jpg' } },
    { restaurantId: restaurant2.id, name: '연어 롤', price: 18000, imageUrl: { url: 'https://example.com/food6.jpg' } },
    { restaurantId: restaurant2.id, name: '텐동', price: 16000, imageUrl: { url: 'https://example.com/food7.jpg' } },
    { restaurantId: restaurant2.id, name: '우동', price: 14000, imageUrl: { url: 'https://example.com/food8.jpg' } }
  ];

  const foods = await Promise.all(foodsData.map(data => prisma.foods.create({ data })));

  // 주문 데이터 생성
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

  // 리뷰 데이터 생성
  const review1 = await prisma.reviews.create({
    data: {
      rate: "ONE",
      content: "별로에요",
      imageUrl: JSON.stringify(["https://example.com/review1.jpg"]), // JSON 형식으로 변환
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
      imageUrl: JSON.stringify(["https://example.com/review2.jpg"]), // JSON 형식으로 변환
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
    foods,
    order1,
    order2,
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