import { errors } from '@project-starter/shared/build';
import { SimpleGraphQLError } from './SimpleGraphQLError';

export class UnsupportedImageTypeError extends SimpleGraphQLError {
  constructor() {
    super('Unsupported image type, try another image.', errors.UnsupportedImageType());
  }
}
