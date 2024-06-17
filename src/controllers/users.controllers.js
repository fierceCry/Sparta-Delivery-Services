export class UsersController {
  usersService = new UsersService();
  getUser = async (req, res, next) => {
    const userId = req.user;

    const user = await this.usersService.getUser(userId);

    res
      .status(200)
      .json({ message: '정상적으로 정보조회가 완료되었습니다.', data: user });
    return;
  };
}
