import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodeMailer from 'nodemailer';
import { redisCli } from '../utils/utils.redis.js';
import { HttpError } from '../errors/http.error.js';
import { ENV_KEY } from '../constants/env.constants.js';
import { generateRandomCode } from '../utils/utils.random.js';
import {
  HASH_SALT_ROUNDS,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  USER_ROLES,
} from '../constants/auth.constants.js';
export class AuthService {
  constructor(authRepository) {
    this.authRepository = authRepository;
    this.transporter = nodeMailer.createTransport({
      service: ENV_KEY.GMAIL_ID,
      auth: {
        user: ENV_KEY.GMAIL_CLIENT_ID,
        pass: ENV_KEY.GMAIL_CLIENT_SECRET,
      },
    });
  }

  async signUp({
    email,
    password,
    name,
    nickname,
    address,
    phoneNumber,
    emailValidator,
  }) {
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
      emailValidator,
    });

    return userData;
  }

  async signUpRestaurant({
    bossName,
    bossEmail,
    bossPassword,
    restaurantName,
    restaurantAddress,
    restaurantType,
    restaurantPhoneNumber,
    emailValidator,
  }) {
    const userData = await this.authRepository.findRestaurantByEmail({
      bossEmail,
    });

    if (userData) {
      throw new HttpError.Conflict('이미 가입된 사용자입니다.');
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
      emailValidator,
    });

    return data;
  }

  async signIn({ email, password, role }) {
    const user = await this.authRepository.findByEmailAndRole({
      email,
      role,
    });
    if (!user) {
      throw new HttpError.BadRequest('가입 된 사용자가 없습니다.');
    }

    const passwordToCompare =
      role === USER_ROLES.CUSTOMER ? user.password : user.bossPassword;
    const isValidPassword = bcrypt.compareSync(password, passwordToCompare);

    if (!isValidPassword) {
      throw new HttpError.Unauthorized('인증정보가 유효하지 않습니다.');
    }

    const accessToken = this.generateTokens(user.id, role);
    await this.authRepository.token(user.id, accessToken.refreshToken);

    return accessToken;
  }

  generateTokens(userId, role) {
    const accessToken = jwt.sign(
      { id: userId, role: role },
      ENV_KEY.SECRET_KEY,
      {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      }
    );

    const refreshToken = jwt.sign(
      { id: userId, role: role },
      ENV_KEY.REFRESH_SECRET_KEY,
      {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
      }
    );

    return { accessToken, refreshToken };
  }

  async sendVerificationEmail({ email, role }) {
    const user = await this.authRepository.findByEmailAndRole({
      email,
      role,
    });
    if (user) {
      throw new HttpError.BadRequest('이미 가입된 이메일입니다.');
    }
    const emailCode = generateRandomCode();

    const key = `${email}:${role}`;
    await redisCli.set(key, emailCode, { EX: 200 });

    const mailOptions = {
      to: email,
      subject: '배달 서비스 이메일 인증번호 발송',
      html: `
          <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: none; width: 100%; max-width: 600px; margin: 0 auto;">
            <tr>
              <td style="padding: 20px; text-align: center;">
                <h2 style="color: #333; font-size: 24px; margin: 0;">가입확인 인증번호 발송</h2>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; text-align: center;">
                <p style="color: #666; font-size: 16px; margin: 0;">
                  안녕하세요, 배달 서비스 가입을 위한 인증번호가 발송되었습니다.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px; text-align: center;">
                <div style="background-color: #007BFF; color: #FFF; font-size: 18px; padding: 10px 20px; text-align: center; border-radius: 5px;">
                  인증번호: <strong>${emailCode}</strong>
                </div>
              </td>
            </tr>
          </table>
        `,
    };
    this.transporter.sendMail(mailOptions);
  }

  verifyEmail = async ({ email, emailCode, role }) => {
    const key = `${email}:${role}`;
    const data = await redisCli.get(key);
    if (!data) {
      throw new HttpError.BadRequest('인증코드가 만료되었습니다.');
    }
    if (data !== emailCode) {
      throw new HttpError.BadRequest('인증코드가 유효하지 않습니다.');
    }
    await redisCli.del(key);
  };
}
