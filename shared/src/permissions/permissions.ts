import JSBI from 'jsbi';

export enum Permission {
  LOGIN = 'can:login',
  ADMINISTRATE = 'can:administrate',
}

let memoMap: Map<string, JSBI> | null = null;
let reversedMemoMap: Map<JSBI, string> | null = null;

export const permissionMap = () => {
  if (memoMap) {
    return memoMap;
  }

  // initialize permission map
  memoMap = new Map<string, JSBI>();

  Object.values(Permission).forEach((permission, idx) => {
    memoMap?.set(permission, JSBI.leftShift(JSBI.BigInt(1), JSBI.BigInt(idx)));
  });

  return memoMap;
}

export const reversedPermissionMap = () => {
  if (reversedMemoMap) {
    return reversedMemoMap;
  }

  reversedMemoMap = new Map(Array.from(permissionMap().entries()).map(([key, value]) => [value, key]));
  console.log(memoMap, reversedMemoMap);

  return reversedMemoMap;
}
