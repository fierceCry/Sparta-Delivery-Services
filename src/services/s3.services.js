import { s3 } from '../../aws.config.js';
import { v4 as uuidv4 } from 'uuid';
import { ENV_KEY } from '../constants/env.constants.js';

export const uploadImageS3 = async (file) => {
  const fileName = `${uuidv4()}-${file.originalname}`;
  const params = {
    Bucket: ENV_KEY.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  const data = await s3.upload(params).promise();
  return data.Location;
};

export const deleteImageS3 = async (imageUrl) => {
  const url = new URL(imageUrl);
  const key = decodeURIComponent(url.pathname.substring(1));

  const params = {
    Bucket: ENV_KEY.AWS_S3_BUCKET_NAME,
    Key: key,
  };

  await s3.deleteObject(params).promise();
};
