import { compare } from 'bcrypt';

export const compareOrReject = async (leftPassword: string, rightPassword: string) => {
  const isEqual = await compare(leftPassword, rightPassword);

  if (!isEqual) {
    throw new Error('Incorrect password');
  }
};
