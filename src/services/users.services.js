import { UsersRepository } from '../repositories/users.repository.js';

export class UsersService {
  usersRepository = new UsersRepository();
  getUser = async (id) => {
    const user = await this.usersRepository.getUser(id);
    const { name, email, nickname, phonenumber, address } = user;
    return {
      id: user.id,
      name,
      email,
      nickname,
      phonenumber,
      address,
    };
  };
}
