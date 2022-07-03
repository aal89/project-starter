import JSBI from 'jsbi';

export enum Permission {
  LOGIN = 'can:login',
  ADMINISTRATE = 'can:administrate',
}

let memoMap: Map<Permission, string> | null = null;
let reversedMemoMap: Map<string, Permission> | null = null;

export const permissionMap = () => {
  if (memoMap) {
    return memoMap;
  }

  // initialize permission map
  memoMap = new Map<Permission, string>();

  Object.values(Permission).forEach((permission, idx) => {
    memoMap?.set(permission, JSBI.leftShift(JSBI.BigInt(1), JSBI.BigInt(idx)).toString());
  });

  return memoMap;
}

export const reversedPermissionMap = () => {
  if (reversedMemoMap) {
    return reversedMemoMap;
  }

  reversedMemoMap = new Map(Array.from(permissionMap().entries()).map(([key, value]) => [value, key]));

  return reversedMemoMap;
}
