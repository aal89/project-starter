import { formatMessage } from '../locales';

export class IncorrectOTPError extends Error {
  constructor() {
    super(formatMessage('User.WrongOTP').message);
  }
}
