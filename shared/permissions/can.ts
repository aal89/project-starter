import { decodePermissionSet } from './permissionCodec';
import { Permission } from './permissions';

type Permissions = {
  permissions: string;
  permissionIds?: bigint[];
}

const permissionMap: Map<BigInt, string> = new Map();

// initialize permission map
if (permissionMap.size === 0) {
  Object.values(Permission).forEach((permission, idx) => {
    permissionMap.set(BigInt(2 ** idx), permission);
  });
}

const inPermissionMapAt = (idx: BigInt, value: string) => permissionMap.get(idx) === value;

export const can = (assertedPermission: Permission, {
    permissions: encodedPermissions,
    permissionIds: decodedPermissions,
  }: Permissions) => {
    // optimization; on serverside we have permissionIds directly on the User
    // object, no need to decode
    // on client side we only have encoded permissions found in the token, so use
    // decoding
    return (decodedPermissions ?? Array.from(decodePermissionSet(encodedPermissions)))
      .some((n) => inPermissionMapAt(n, assertedPermission));
  };
