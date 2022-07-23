import { randomBytes } from 'crypto';

export const randomString = (length?: number) => randomBytes(length ?? 15).toString('base64');
