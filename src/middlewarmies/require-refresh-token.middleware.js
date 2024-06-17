import bcrypt from 'bcrypt';
import { prisma } from '../utils/prisma.util.js';
import { ENV_KEY } from '../constants/env.constant.js';
import { validateToken } from './require-access-token.middleware.js';
import { MESSAGES } from '../constants/message.constant.js';
import {
  HttpError
} from '../errors/http.error.js';
import { UserRepository } from '../repositories/users.repository.js';

const userRepository = new UserRepository();

/** RefreshToken 토큰 검증 및 재발급 미들웨어 **/
const refreshTokenMiddleware = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new HttpError.BadRequest('인증 정보가 없습니다.');
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      throw new HttpError.Unauthorized('지원하지 않는 인증 방식입니다.');
    }

    // 리프래시 토큰 검증
    const payload = await validateToken(token, ENV_KEY.REFRESH_SECRET_KEY);
    if (payload === 'expired') {
      throw new HttpError.Unauthorized('인증 정보가 만료되었습니다.');
    } else if (payload === 'JsonWebTokenError') {
      throw new HttpError.Unauthorized('인증 정보가 유효하지 않습니다.');
    }

    const tokenData = await userRepository.findByToken(payload.id);
    if (!tokenData) {
      throw new HttpError.BadRequest('폐기 된 인증 정보입니다.');
    }

    const isValid = bcrypt.compareSync(token, tokenData.refreshToken);
    if (!isValid) {
      throw new HttpError.BadRequest('폐기 된 인증 정보입니다.');
    }

    const user = await userRepository.findById(payload.id)
    if (!user) {
      throw new HttpError.NotFound(MESSAGES.AUTH.COMMON.JWT.NO_USER);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export { refreshTokenMiddleware };
