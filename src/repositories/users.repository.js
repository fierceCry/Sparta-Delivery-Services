import { USER_ROLES } from '../constants/auth.constants.js';
import { prisma } from '../utils/utils.prisma.js';
export class UserRepository {

  findByToken = async (id)=>{
    return await prisma.refreshToken.findUnique({
      where:{ userId: id}
    })
  }

  findByIdAndRole = async(userId, role)=>{
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
}

