import Joi from 'joi';

const schema = Joi.object({
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
});

export const restaurantUpdateValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
