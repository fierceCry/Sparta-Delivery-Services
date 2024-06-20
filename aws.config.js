import AWS from 'aws-sdk';
import 'dotenv/config';
import { ENV_KEY } from './src/constants/env.constants.js';

AWS.config.update({
  accessKeyId: ENV_KEY.AWS_ACCESS_KEY_ID,
  secretAccessKey: ENV_KEY.AWS_SECRET_ACCESS_KEY,
  region: ENV_KEY.AWS_REGION,
});

const s3 = new AWS.S3();

export { s3 };
