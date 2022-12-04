import { formatMessage } from '../locales';

export class UnsupportedImageTypeError extends Error {
  constructor() {
    super(formatMessage('User.UploadUnsupportedImageType').message);
  }
}
