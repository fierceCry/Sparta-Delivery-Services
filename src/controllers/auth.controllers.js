import { HTTP_STATUS } from '../constants/http-status.constant.js';

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  //  6월 17일에 동작을 해야하므로 이메일인증기능을 추가하지않지만 추후에 바로 이메일인증 기능 추가해야함
  signUp = async (req, res, next) => {
    try {
      const { email, password, name, nickname, address, phoneNumber } =
        req.body;
      const userData = await this.authService.signUp({
        email,
        password,
        name,
        nickname,
        address,
        phoneNumber,
      });

      return res
        .status(HTTP_STATUS.OK)
        .json({ message: '고객 회원가입이 완료되었습니다.', data: userData });
    } catch (error) {
      next(error);
    }
  };

  signUpRestaurant = async (req, res, next) => {
    try {
      const {
        bossName,
        bossEmail,
        bossPassword,
        restaurantName,
        restaurantAddress,
        restaurantType,
        restaurantPhoneNumber,
      } = req.body;

      const userData = await this.authService.signUpRestaurant({
        bossName,
        bossEmail,
        bossPassword,
        restaurantName,
        restaurantAddress,
        restaurantType,
        restaurantPhoneNumber,
      });

      return res
        .status(HTTP_STATUS.OK)
        .json({ message: '업장 회원가입 완료되었습니다.', data: userData });
    } catch (error) {
      next(error);
    }
  };

  signIn = async (req, res, next) => {
    try {
      const { email, password, role } = req.body;
      const token = await this.authService.signIn({
        email,
        password,
        role,
      });
      return res
        .status(HTTP_STATUS.OK)
        .json({ message: '로그인이 성공하였습니다.', data: token });
    } catch (error) {
      next(error);
    }
  };
}
