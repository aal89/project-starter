import { randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export const randomString = (length?: number) => randomBytes(length ?? 15).toString('base64');
export const randomFilename = (ext: string) => `${uuidv4()}.${ext}`;
