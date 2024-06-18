import Joi from 'joi';

// 게시글 작성 joi 스키마
const schema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().integer().required(),
  imageUrl: Joi.string().required(),
});

// 게시글 작성 유효성 검사 미들웨어
export const postFoodValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
