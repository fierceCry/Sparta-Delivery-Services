import Joi from 'joi';
import { REVIEW_RATE } from '../../constants/review.constants.js';

const schema = Joi.object({
  rate: Joi.string()
    .valid(...Object.values(REVIEW_RATE))
    .optional(),
  content: Joi.string().optional(),
  imageUrl: Joi.string().optional().uri(),
});

export const updateReiveValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
