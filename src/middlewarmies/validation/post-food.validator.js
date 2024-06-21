import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': '이름을 입력해 주세요.',
  }),
  price: Joi.number().positive().integer().required().messages({
    'any.required': '가격을 입력해 주세요.',
  }),
});

export const postFoodValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
