import { formatMessage } from '../locales';
import { FormatError } from './FormatError';

export class UnsupportedImageTypeError extends FormatError {
  constructor() {
    super(formatMessage('User.UploadUnsupportedImageType'));
  }
}
