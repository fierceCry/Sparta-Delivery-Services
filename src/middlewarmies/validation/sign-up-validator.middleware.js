import Joi from 'joi';
import { MIN_PASSWORD_LENGTH } from '../../constants/auth.constants.js';

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': '이메일을 입력해주세요.',
    'string.email': '유효한 이메일 형식이 아닙니다.',
  }),
  password: Joi.string()
    .required()
    .min(MIN_PASSWORD_LENGTH)
    .messages({
      'any.required': '비밀번호를 입력해주세요.',
      'string.min': `비밀번호는 최소 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`,
    }),
  name: Joi.string().required().messages({
    'any.required': '이름을 입력해주세요.',
  }),
  nickname: Joi.string().required().messages({
    'any.required': '닉네임을 입력해주세요.',
  }),
  address: Joi.string().required().messages({
    'any.required': '주소를 입력해주세요.',
  }),
  phoneNumber: Joi.string().required().messages({
    'any.required': '전화번호를 입력해주세요.',
  }),
});

export const signUpValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
