import { ValidationError as VE } from 'class-validator';

enum PostgresError {
  Duplicate = '23505',
}

export enum DatabaseError {
  Unknown,
  Duplicate,
}

export enum ValidationError {
  Username4MinLength,
}

const hasCode = (o: any): o is { code: string } => o && o.code && typeof o.code === 'string';
const isValidationError = (o: any): o is VE => o && o.property && typeof o.property === 'string';

export const translateError = (err: unknown) => {
  if (hasCode(err) && err.code === PostgresError.Duplicate) {
    return DatabaseError.Duplicate;
  }

  if (isValidationError(err) && err.property === 'username') {
    return ValidationError.Username4MinLength;
  }

  return DatabaseError.Unknown;
};
