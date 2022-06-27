import { decodeHexInSet } from './permissionCodec';
import { inPermissionMapAt, Permission } from './permissions';

type Permissions = {
  permissions: string;
  permissionIds?: bigint[];
}

export const can = (assertedPermission: Permission, {
    permissions: encodedPermissions,
    permissionIds: decodedPermissions,
  }: Permissions) => {
    // optimization; on serverside we have permissionIds directly on the User
    // object, no need to decode
    // on client side we only have encoded permissions found in the token, so use
    // decoding
    return (decodedPermissions ?? Array.from(decodeHexInSet(encodedPermissions)))
      .some((n) => inPermissionMapAt(n, assertedPermission));
  };
