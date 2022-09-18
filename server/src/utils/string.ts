import { randomBytes } from 'crypto';

export const randomString = (length?: number) => randomBytes(length ?? 15).toString('base64');
export const randomFilename = (ext: string, length?: number) => `${randomString(length).replace(/[/+=]/g, '')}.${ext}`;
