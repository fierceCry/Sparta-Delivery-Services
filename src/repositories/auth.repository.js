import { USER_ROLES } from '../constants/auth.constants.js';

export class AuthRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findByUserId = async (userId) => {
    return await this.prisma.users.findUnique({
      where: { id: +userId },
    });
  };

  findByRestaurantsId = async (userId) => {
    return await this.prisma.restaurants.findUnique({
      where: { id: +userId },
    });
  };

  findByEmail = async ({ email }) => {
    return this.prisma.users.findFirst({
      where: { email: email },
    });
  };

  findByNickname = async ({ nickname }) => {
    return await this.prisma.users.findFirst({ where: { nickname } });
  };

  createUser = async ({
    email,
    hashedPassword,
    name,
    nickname,
    address,
    phoneNumber,
    emailValidator,
  }) => {
    return this.prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        name,
        nickname,
        address,
        phoneNumber,
        emailValidator,
      },
    });
  };

  findByEmailAndRole = async ({ email, role }) => {
    if (role === USER_ROLES.CUSTOMER) {
      return this.prisma.users.findFirst({
        where: { email },
      });
    } else if (role === USER_ROLES.RESTAURANT) {
      return this.prisma.restaurants.findFirst({
        where: { bossEmail: email },
      });
    }
  };

  findRestaurantByEmail = async ({ bossEmail }) => {
    return this.prisma.restaurants.findFirst({
      where: { bossEmail },
    });
  };

  createRestaurantUser = async ({
    bossName,
    bossEmail,
    hashedPassword,
    restaurantName,
    restaurantAddress,
    restaurantType,
    restaurantPhoneNumber,
    emailValidator,
  }) => {
    return this.prisma.restaurants.create({
      data: {
        bossName,
        bossEmail,
        bossPassword: hashedPassword,
        restaurantName,
        restaurantAddress,
        restaurantType,
        restaurantPhoneNumber,
        emailValidator,
      },
    });
  };

  token = async (userId, hashRefreshToken) => {
    await this.prisma.refreshToken.upsert({
      where: {
        userId,
      },
      update: {
        refreshToken: hashRefreshToken,
      },
      create: {
        userId,
        refreshToken: hashRefreshToken,
      },
    });
  };
}
