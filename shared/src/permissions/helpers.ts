import { PermissionCodec } from './PermissionCodec';
import { Permission } from './permissions';

export const can = (assertedPermission: Permission, encodedPermissions: string) => {
    return PermissionCodec.decode(encodedPermissions)
      .some((decodedPermission) => assertedPermission === decodedPermission);
  };

export const decode = (encodedPermissions: string) => PermissionCodec.decode(encodedPermissions);
export const encode = (decodedPermissions: Permission[]) => PermissionCodec.encode(decodedPermissions);

export const removePermission = (encodedPermissions: string, permission: Permission) => encode(decode(encodedPermissions).filter((p) => p !== permission));
