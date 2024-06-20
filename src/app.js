import express from 'express';
import http from 'http';
import { createWebSocketServer } from '../src/utils/socket.js';
import { ENV_KEY } from './constants/env.constants.js';
import { requestLogger } from './middlewarmies/log.middleware.js';
import { router } from './routers/index.js';
import { globalErrorHandler } from './middlewarmies/error-handler.middleware.js';
import { HTTP_STATUS } from './constants/http-status.constant.js';

const app = express();
const server = http.createServer(app);
createWebSocketServer(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(router);
app.use(globalErrorHandler);

app.get('/api', (req, res) => {
  return res.status(HTTP_STATUS.OK).json({ message: '테스트 성공하였습니다.' });
});

server.listen(ENV_KEY.PORT, async () => {
  console.log(ENV_KEY.PORT, '포트로 서버가 열렸습니다.');
});
