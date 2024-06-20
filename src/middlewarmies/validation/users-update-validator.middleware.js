import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': '이름을 입력해주세요.',
  }),
  address: Joi.string().required().messages({
    'any.required': '주소를 입력해주세요.',
  }),
  nickname: Joi.string().required().messages({
    'any.required': '별명를 입력해주세요.',
  }),
  phoneNumber: Joi.string().required().messages({
    'any.required': '업장 전화번호를 입력해주세요.',
  }),
});

export const usersUpdateValidator = async (req, res, next) => {
  try {
    console.log(req.body)
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
