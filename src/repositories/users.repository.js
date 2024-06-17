import prisma from '../utils/utils.prisma.js';

export class UsersRepository {
  getUser = async (userId) => {
    const user = await prisma.users.findFirst({
      where: { userId },
    });

    return user;
  };
}
