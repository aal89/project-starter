import { formatMessage } from '../locales';
import { FormatError } from './FormatError';

export class SomethingWentWrong extends FormatError {
  constructor() {
    super(formatMessage('Error.SWW'));
  }
}
