import { prisma } from '../utils/utils.prisma.js';
export class UserRepository {

  findById = async (userId) => {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  };

  findByToken = async (id)=>{
    return await prisma.refreshToken.findUnique({
      where:{ userId: id}
    })
  }
}
