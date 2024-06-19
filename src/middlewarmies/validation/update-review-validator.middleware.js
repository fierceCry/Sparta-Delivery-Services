import Joi from 'joi';
import { Rating } from '../../constants/review.constants.js';

const schema = Joi.object({
  rate: Joi.string()
    .valid(...Object.values(Rating))
    .optional(),
  content: Joi.string().optional(),
  deleteImages: Joi.alternatives()
    .try(Joi.array().items(Joi.string().uri()), Joi.string().uri())
    .optional(),
});

export const updateReiWeValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
