export enum Permission {
  LOGIN = 'can:login',
  ADMINISTRATE = 'can:administrate',
}

let memoMap: Map<string, bigint> | null = null;
let reversedMemoMap: Map<bigint, string> | null = null;

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

export const reversedPermissionMap = () => {
  if (reversedMemoMap) {
    return reversedMemoMap;
  }

  reversedMemoMap = new Map(Array.from(permissionMap().entries()).map(([key, value]) => [value, key]));
  console.log(memoMap, reversedMemoMap);

  return reversedMemoMap;
}
