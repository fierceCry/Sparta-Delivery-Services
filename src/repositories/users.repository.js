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
      return this.prisma.users.findUnique({
        where: { id: userId },
      });
    } else if (role === USER_ROLES.RESTAURANT) {
      return this.prisma.restaurants.findUnique({
        where: { id: userId },
      });
    }
  };
}
