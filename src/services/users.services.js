export class UsersService {
  usersRepository = new UsersRepository();
  getUser = async (userId) => {
    const user = await this.usersRepository.getUser(userId);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      nickname: user.nickname,
      phonenumber: user.phonenumber,
      address: user.address,
    };
  };
}
