import express from 'express';
import { ENV_KEY } from './constants/env.constants.js';
import { requestLogger } from './middlewarmies/log.middleware.js';
import { router } from './routers/index.js';
import { globalErrorHandler } from './middlewarmies/error-handler.middleware.js';
import multer from 'multer';
import { HTTP_STATUS } from './constants/http-status.constant.js';
import { uploadImageS3 } from './services/s3.services.js';

const app = express();
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(router);
app.use(globalErrorHandler);

app.post('/upload', upload.single('image'), async (req, res) => {
  const file = req.file;
  if (!file) {
    console.log('파일이 업로드되지 않았습니다.');
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .send('파일이 업로드되지 않았습니다.');
  }

  const imageUrl = await uploadImageS3(file);
  res.status(HTTP_STATUS.OK).send({ imageUrl });
});

app.get('/api', (req, res) => {
  return res.status(HTTP_STATUS.OK).json({ message: '테스트 성공하였습니다.' });
});

app.listen(ENV_KEY.PORT, async () => {
  console.log(ENV_KEY.PORT, '포트로 서버가 열렸습니다.');
});
