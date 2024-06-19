import Joi from 'joi';
import { Rating } from '../../constants/review.constants.js';

const schema = Joi.object({
  rate: Joi.string()
    .required()
    .valid(...Object.values(Rating))
    .messages({
      'any.required': '평점을 입력해 주세요.',
    }),
  content: Joi.string().required().messages({
    'any.required': '리뷰 내용을 입력해 주세요.',
  }),
});

export const createReiveValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
