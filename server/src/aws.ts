import AWS from 'aws-sdk';
import { env } from './env';
import { log } from './logger/log';

AWS.config.update({
  accessKeyId: env.aws.keyId(),
  secretAccessKey: env.aws.secret(),
  region: env.aws.region(),
});

const s3 = new AWS.S3({
  useDualstackEndpoint: true,
});

const getS3UploadUrl = (filename: string, contentType: string) => {
  return s3.getSignedUrlPromise('putObject', {
    Bucket: env.aws.bucket(),
    Key: filename,
    Expires: env.aws.signExpiry(),
    ContentType: contentType,
    CacheControl: 'public, max-age=15552000',
    ACL: 'public-read',
  });
};

const s3DeleteObject = (filename: string) => {
  log.info(`Deleting S3 object ${env.aws.bucket()}/${filename}`);
  return s3.deleteObject({ Bucket: env.aws.bucket(), Key: filename }).promise();
};

export { getS3UploadUrl, s3DeleteObject };
