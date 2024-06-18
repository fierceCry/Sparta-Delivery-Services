import { HTTP_STATUS } from '../constants/http-status.constant.js';

export class UsersController {
  getUser = async (req, res) => {
    const user = req.user;

    res
      .status(HTTP_STATUS.OK)
      .json({ message: '정상적으로 정보조회가 완료되었습니다.', data: user });
    return;
  };
}
