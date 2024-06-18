import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpError } from '../errors/http.error.js';
import { ENV_KEY } from '../constants/env.constants.js';
import {
  HASH_SALT_ROUNDS,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  USER_ROLES,
} from '../constants/auth.constants.js';
export class AuthService {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  signUp = async ({
    email,
    password,
    name,
    nickname,
    address,
    phoneNumber,
  }) => {
    const user = await this.authRepository.findByEmail({ email });
    if (user) {
      throw new HttpError.Conflict('이미 가입된 사용자가 있습니다.');
    }

    const existingNickname = await this.authRepository.findByNickname({
      nickname,
    });
    if (existingNickname) {
      throw new HttpError.Conflict('이미 사용 중인 닉네임입니다.');
    }

    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);
    const { password: _, ...userData } = await this.authRepository.createUser({
      email,
      hashedPassword,
      name,
      nickname,
      address,
      phoneNumber,
    });

    return userData;
  };

  signUpRestaurant = async ({
    bossName,
    bossEmail,
    bossPassword,
    restaurantName,
    restaurantAddress,
    restaurantType,
    restaurantPhoneNumber,
  }) => {
    const userData = await this.authRepository.findRestaurantByEmail({
      bossEmail,
    });

    if (userData) {
      throw new HttpError.Conflict('가입 된 사용자입니다.');
    }
    const hashedPassword = bcrypt.hashSync(bossPassword, HASH_SALT_ROUNDS);

    const data = await this.authRepository.createRestaurantUser({
      bossName,
      bossEmail,
      hashedPassword,
      restaurantName,
      restaurantAddress,
      restaurantType,
      restaurantPhoneNumber,
    });

    return data;
  };

  signIn = async ({ email, password, role }) => {
    const user = await this.authRepository.findByEmailAndRole({ email, role });
    if (!user) {
      throw new HttpError.BadRequest('가입 된 사용자가 없습니다.');
    }

    const passwordToCompare =
      role === USER_ROLES.CUSTOMER ? user.password : user.bossPassword;
    const isValidPassword = bcrypt.compareSync(password, passwordToCompare);

    if (!isValidPassword) {
      throw new HttpError.Unauthorized('인증정보가 유효하지 않습니다.');
    }

    const accessToken = this.generateTokens(user.id);
    await this.authRepository.token(user.id, accessToken.refreshToken);

    return accessToken;
  };

  generateTokens = (userId) => {
    const accessToken = jwt.sign({ id: userId }, ENV_KEY.SECRET_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = jwt.sign({ id: userId }, ENV_KEY.REFRESH_SECRET_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  };
}
