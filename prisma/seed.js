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
    },
  });

  console.log({ user1, user2, restaurant1, restaurant2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
