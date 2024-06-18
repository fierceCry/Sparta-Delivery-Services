import express from 'express';
import { ENV_KEY } from './constants/env.constants.js';
import { requestLogger } from './middlewarmies/log.middleware.js';
import { router } from './routers/index.js';
import { globalErrorHandler } from './middlewarmies/error-handler.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(requestLogger);
app.use(globalErrorHandler);

app.get('/api', (req, res) => {
  return res.status(200).json({message :'테스트 성공하였습니다.'});
});

app.listen(ENV_KEY.PORT, async () => {
  console.log(ENV_KEY.PORT, '포트로 서버가 열렸습니다.');
});
