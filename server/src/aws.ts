import AWS from 'aws-sdk';
import { env } from './env';

AWS.config.update({ accessKeyId: env.aws.keyId(), secretAccessKey: env.aws.secret() });
AWS.config.region = env.aws.region();

const s3 = new AWS.S3();

const getS3UploadUrl = (filename: string, contentType: string) => {
  return s3.getSignedUrlPromise('putObject', {
    Bucket: env.aws.bucket(),
    Key: filename,
    Expires: env.aws.signExpiry(),
    ContentType: contentType,
    ACL: 'public-read',
  });
};

export { getS3UploadUrl };
