import Joi from 'joi';
import { Rating } from '../../constants/review.constants.js';

const schema = Joi.object({
  rate: Joi.string()
    .valid(...Object.values(Rating))
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
