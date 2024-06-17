import { prisma } from '../utils/utils.prisma.js';

export class UsersRepository {
  getUser = async (id) => {
    const user = await prisma.Users.findFirst({
      where: { id },
    });

    return user;
  };
}
