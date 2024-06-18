import redis from 'redis';
import { ENV_KEY } from '../constants/env.constants.js';

const redisClient = redis.createClient({
  url: `redis://${ENV_KEY.REDIS_USER_NAME}:${ENV_KEY.REDIS_PASSWORD}@${ENV_KEY.REDIS_HOST}:${ENV_KEY.REDIS_PORT}/0`,
  password: ENV_KEY.REDIS_PASSWORD,
  legacyMode: true
});
redisClient.on('connect', () => {
  console.info('Redis 연결에 성공했습니다.');
});

redisClient.on('error', (err) => {
  console.error('Redis 연결에 실패하였습니다.', err);
});

redisClient.connect().then(() => {
  console.info('Redis v4 연결에 성공했습니다.');
}).catch(err => {
  console.error('Redis v4 연결에 실패했습니다.', err);
});
const redisCli = redisClient.v4;

export { redisClient, redisCli };
