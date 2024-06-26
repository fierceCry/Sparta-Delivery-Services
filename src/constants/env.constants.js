import 'dotenv/config';

export const ENV_KEY = {
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
  GMAIL_CLIENT_ID: process.env.GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET: process.env.GMAIL_CLIENT_SECRET,
  GMAIL_ID: process.env.GMAIL_ID,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_USER_NAME: process.env.REDIS_USER_NAME,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
};
