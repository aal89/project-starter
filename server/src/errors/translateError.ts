import { ValidationError as VE } from 'class-validator';

enum PostgresError {
  Duplicate = '23505',
}

export enum DatabaseError {
  Unknown,
  DuplicateUsername,
  DuplicateEmail,
}

export enum ValidationError {
  Username4MinLength,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasCode = (o: any): o is { code: string; detail: string } => o && o.code && typeof o.code === 'string' && o.detail && typeof o.detail === 'string';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidationError = (o: any): o is VE => o && o.property && typeof o.property === 'string';

export const translateError = (err: unknown) => {
  if (hasCode(err) && err.code === PostgresError.Duplicate && err.detail.includes('username')) {
    return DatabaseError.DuplicateUsername;
  }

  if (hasCode(err) && err.code === PostgresError.Duplicate && err.detail.includes('email')) {
    return DatabaseError.DuplicateEmail;
  }

  if (isValidationError(err) && err.property === 'username') {
    return ValidationError.Username4MinLength;
  }

  return DatabaseError.Unknown;
};
