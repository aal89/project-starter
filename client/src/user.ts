import { UserModel } from './graphql/generated/graphql';

export const getImageUrl = ({ image }: UserModel) => `${process.env.REACT_APP_BUCKET_URL}/${image}`;
