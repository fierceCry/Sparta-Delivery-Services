import { s3Client } from '../../aws.config.js';
import { v4 as uuidv4 } from 'uuid';
import { ENV_KEY } from '../constants/env.constants.js';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

export const uploadImageS3 = async (file) => {
  const fileName = `${uuidv4()}-${file.originalname}`;
  const params = {
    Bucket: ENV_KEY.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    return `https://${ENV_KEY.AWS_S3_BUCKET_NAME}.s3.${ENV_KEY.AWS_REGION}.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error('Error uploading image to S3:', error);
    throw error;
  }
};

export const deleteImageS3 = async (imageUrl) => {
  const url = new URL(imageUrl);
  const key = decodeURIComponent(url.pathname.substring(1));

  const params = {
    Bucket: ENV_KEY.AWS_S3_BUCKET_NAME,
    Key: key,
  };

  try {
    await s3Client.send(new DeleteObjectCommand(params));
  } catch (error) {
    console.error('Error deleting image from S3:', error);
    throw error;
  }
};