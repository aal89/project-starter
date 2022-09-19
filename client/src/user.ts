import config from './config';
import { User } from './graphql/generated/graphql';

export const getImageUrl = ({ image }: User) => `${config.bucketUrl}/${image}`;
