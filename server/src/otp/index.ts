import { createHash, pbkdf2 as callbackPbkdf2 } from 'crypto';
import { promisify } from 'util';
import { env } from '../env';
import { encode as base32Encode } from './base32';
import OTP from './otp';

const SECONDS_IN_DAY = 86400;
const KEYSIZE = 128;

const pbkdf2 = promisify(callbackPbkdf2);
const md5 = (str: string) => createHash('md5').update(str).digest('hex');

const derivePassword = (str: string) => {
  return pbkdf2(env.otpSecret(), md5(str), 10000, KEYSIZE, 'sha512');
};

export const generateDailyTotp = (secret: string, offsetEpoch: number = Date.now()) => {
  return generateTotp(secret, SECONDS_IN_DAY, offsetEpoch);
};

export const generateTotp = async (
  secret: string,
  timeSlice: number,
  offset: number,
  epoch = 0,
) => {
  const derivedPasswordSecret = await derivePassword(secret);

  const otp = new OTP({
    keySize: KEYSIZE,
    secret: base32Encode(derivedPasswordSecret),
    timeSlice,
    epoch,
  });

  return otp.totp(offset);
};
