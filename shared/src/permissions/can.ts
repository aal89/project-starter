import { PermissionCodec } from './PermissionCodec';
import { Permission } from './permissions';

export const can = (assertedPermission: Permission, encodedPermissions: string) => {
    return PermissionCodec.decode(encodedPermissions)
      .some((decodedPermission) => assertedPermission === decodedPermission);
  };
