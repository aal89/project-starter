export enum Permission {
  LOGIN = 'can:login',
  ADMINISTRATE = 'can:administrate',
}

let memoMap: Map<string, bigint> | null = null;

export const permissionMap = () => {
  if (memoMap) {
    return memoMap;
  }

  // initialize permission map
  memoMap = new Map<string, bigint>();

  Object.values(Permission).forEach((permission, idx) => {
    memoMap?.set(permission, BigInt(2 ** idx));
  });

  return memoMap;
}

export const inPermissionMapAt = (idx: bigint, value: string) => permissionMap().get(value) === idx;
