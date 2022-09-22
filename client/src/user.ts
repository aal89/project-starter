import config from './config';
import { UserModel } from './graphql/generated/graphql';

export const getImageUrl = ({ image }: UserModel) => `${config.bucketUrl}/${image}`;
