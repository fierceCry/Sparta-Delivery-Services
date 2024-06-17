import Joi from 'joi';
import { USER_ROLES } from '../../constants/auth.constants.js';
import { MIN_PASSWORD_LENGTH } from '../../constants/auth.constants.js';

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': '이메일을 입력해주세요.',
    'string.email': '유효한 이메일 형식이 아닙니다.',
  }),
  password: Joi.string().required().messages({
    'any.required': '비밀번호를 입력해주세요.',
    'string.min': `비밀번호는 최소 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`,
  }),
  role: Joi.string().valid(USER_ROLES.CUSTOMER, USER_ROLES.RESTAURANT).required().messages({
    'any.required': '역할을 입력해주세요.',
    'any.only': '유효하지 않은 역할입니다.',
  }),
});

export const signInValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
