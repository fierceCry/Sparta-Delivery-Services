import 'dotenv/config';

export const ENV_KEY = {
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY,
  GMAIL_ID: process.env.GMAIL_ID,
  GMAIL_CLIENT_ID: process.env.GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET: process.env.GMAIL_CLIENT_SECRET,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_USER_NAME: process.env.REDIS_USER_NAME,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD
};
