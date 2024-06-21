export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  updateUser = async (id, name, nickname, phoneNumber, address) => {
    const user = await this.userRepository.updateUser(
      id,
      name,
      nickname,
      phoneNumber,
      address
    );
    return { ...user, password: _ };
  };

  logOut = async(id, role)=>{
    return await this.userRepository.logOut(id, role)
  }
}
