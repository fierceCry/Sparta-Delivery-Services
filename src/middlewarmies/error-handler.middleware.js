import { HTTP_STATUS } from '../constants/http-status.constant.js';

const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack);

  return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ message: '예상치 못한 에러가 발생하였습니다.' });
};

export { globalErrorHandler };
