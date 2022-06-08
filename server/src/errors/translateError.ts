enum PostgresError {
  Duplicate = '23505'
}

export enum DatabaseError {
  Unknown,
  Duplicate
}

const hasCode = (o: any): o is { code: string} => o && o.code && typeof o.code === 'string';

export const translateError = (err: unknown) => {
  if (hasCode(err) && err.code === PostgresError.Duplicate) {
    return DatabaseError.Duplicate;
  }

  return DatabaseError.Unknown;
};
