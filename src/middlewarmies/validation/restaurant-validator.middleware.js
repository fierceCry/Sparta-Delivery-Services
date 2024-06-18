import Joi from 'joi';
import { MIN_PASSWORD_LENGTH } from '../../constants/auth.constants.js';
import { USER_ROLES } from '../../constants/auth.constants.js';

const schema = Joi.object({
  bossEmail: Joi.string().email().required().messages({
    'any.required': '이메일을 입력해주세요.',
    'string.email': '유효한 이메일 형식이 아닙니다.',
  }),
  bossPassword: Joi.string()
    .required()
    .min(MIN_PASSWORD_LENGTH)
    .messages({
      'any.required': '비밀번호를 입력해주세요.',
      'string.min': `비밀번호는 최소 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`,
    }),
  bossName: Joi.string().required().messages({
    'any.required': '이름을 입력해주세요.',
  }),
  restaurantName: Joi.string().required().messages({
    'any.required': '업장 이름을 입력해주세요.',
  }),
  restaurantAddress: Joi.string().required().messages({
    'any.required': '업장 주소를 입력해주세요.',
  }),
  restaurantType: Joi.string().required().messages({
    'any.required': '업장 종류를 입력해주세요.',
  }),
  restaurantPhoneNumber: Joi.string().required().messages({
    'any.required': '업장 전화번호를 입력해주세요.',
  }),
  role: Joi.string()
    .valid(USER_ROLES.CUSTOMER, USER_ROLES.RESTAURANT)
    .required()
    .messages({
      'any.required': '역할을 입력해주세요.',
      'any.only': '유효하지 않은 역할입니다.',
    }),
});

export const restaurantSignUpValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
