import { formatMessage } from '../locales';

export abstract class FormatError extends Error {
  constructor(
    private format: ReturnType<typeof formatMessage>,
  ) {
    super(format.message);
  }

  override toString() {
    return this.format.defaultMessage;
  }
}
