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
      return await prisma.users.findUnique({
        where: { id: userId },
      });
    } else if (role === USER_ROLES.RESTAURANT) {
      return await prisma.restaurants.findUnique({
        where: { id: userId },
      });
    }
  };

  updateUser = async (id, name, nickname, phoneNumber, address) => {
    console.log(id);
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
