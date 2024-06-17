import { UsersService } from '../services/users.services.js';

export class UsersController {
  usersService = new UsersService();
  getUser = async (req, res) => {
    const { id } = Number(req.params);

    const user = await this.usersService.getUser(id);

    res
      .status(200)
      .json({ message: '정상적으로 정보조회가 완료되었습니다.', data: user });
    return;
  };
}
