import { prisma } from '../utils/utils.prisma.js';

export class UsersRepository {
  getUser = async (id) => {
    console.log(id);
    const user = await prisma.Users.findFirst({
      where: { id },
    });

    return user;
  };
}
