import { USER_ROLES } from '../constants/auth.constants.js';

export class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  
  findByToken = async (id) => {
    return await this.prisma.refreshToken.findUnique({
      where: { userId: id },
    });
  };

  findByIdAndRole = async ({id, role}) => {
    if (role === USER_ROLES.CUSTOMER) {
      return await this.prisma.users.findUnique({
        where: { id: id },
      });
    } else if (role === USER_ROLES.RESTAURANT) {
      return await this.prisma.restaurants.findUnique({
        where: { id: id },
      });
    }
  };

  updateUser = async (id, name, nickname, phoneNumber, address) => {
    return await this.prisma.Users.update({
      where: { id: +id },
      data: {
        name,
        nickname,
        phoneNumber,
        address,
      },
    });
  };
  
  logOut = async(id, role)=>{
    if (role === USER_ROLES.CUSTOMER) {
      return this.prisma.users.delete({
        where: { id },
      });
    } else if (role === USER_ROLES.RESTAURANT) {
      return this.prisma.restaurants.delete({
        where: { id: id },
      });
    }
  }
}
