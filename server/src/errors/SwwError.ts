import { formatMessage } from '../locales';

export class SomethingWentWrong extends Error {
  constructor() {
    super(formatMessage('Error.SWW').message);
  }
}
