import { decodePermissions } from './permissionCodec';
import { Permission } from './permissions';

export const can = (assertedPermission: Permission, encodedPermissions: string) => {
    return decodePermissions(encodedPermissions)
      .some((decodedPermission) => assertedPermission === decodedPermission);
  };
