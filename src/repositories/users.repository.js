import { USER_ROLES } from '../constants/auth.constants.js';

export class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  findByToken = async (id) => {
    return await prisma.refreshToken.findUnique({
      where: { userId: id },
    });
  };

  findByIdAndRole = async (userId, role) => {
    if (role === USER_ROLES.CUSTOMER) {
      return await this.prisma.users.findUnique({
        where: { id: userId },
      });
    } else if (role === USER_ROLES.RESTAURANT) {
      return await this.prisma.restaurants.findUnique({
        where: { id: userId },
      });
    }
  };

  updateUser = async (id, name, nickname, phoneNumber, address) => {
    const user = await this.prisma.Users.update({
      where: { id: +id },
      data: {
        name,
        nickname,
        phoneNumber,
        address,
        updatedAt: new Date(),
      },
    });
    return user;
  };
}
