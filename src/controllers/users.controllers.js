import { HTTP_STATUS } from '../constants/http-status.constant.js';

export class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  getUser = async (req, res) => {
    const user = req.user;

    const data = { ...user, password: undefined };

    return res
      .status(HTTP_STATUS.OK)
      .json({ message: '정상적으로 정보조회가 완료되었습니다.', data });
  };

  updateUser = async (req, res) => {
    const { id } = req.user;

    const { name, nickname, phoneNumber, address } = req.body;

    const data = await this.userService.updateUser(
      id,
      name,
      nickname,
      phoneNumber,
      address
    );

    return res
      .status(HTTP_STATUS.CREATED)
      .json({ message: '정상적으로 정보수정이 완료되었습니다.', data });
  };
}
