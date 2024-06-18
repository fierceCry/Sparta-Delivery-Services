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
      return this.prisma.users.findUnique({
        where: { userId },
      });
    } else if (role === USER_ROLES.RESTAURANT) {
      return this.prisma.restaurants.findUnique({
        where: { userId },
      });
    }
  };
}
