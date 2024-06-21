import { S3Client } from '@aws-sdk/client-s3';
import { ENV_KEY } from './src/constants/env.constants.js';

const s3Client = new S3Client({
  region: ENV_KEY.AWS_REGION,
  credentials: {
    accessKeyId: ENV_KEY.AWS_ACCESS_KEY_ID,
    secretAccessKey: ENV_KEY.AWS_SECRET_ACCESS_KEY,
  },
});
export { s3Client };