import { errors } from '@project-starter/shared/build';
import { SimpleGraphQLError } from './SimpleGraphQLError';

export class SomethingWentWrong extends SimpleGraphQLError {
  constructor() {
    super('Something went wrong, please try again', errors.Sww());
  }
}
