import { User } from '../entities/User';
import { decodeHexAsPowerOfTwoSet } from '../utils/powerSet';

const permissions: Map<BigInt, string> = new Map();
permissions.set(1n, 'can:login');
permissions.set(2n, 'can:administrate');

export const can = (assertedPermission: string, user: User) => {
  if (user.permissionIds) {
    return user.permissionIds.map(BigInt).some((p) => permissions.get(p) === assertedPermission);
  }

  return Array.from(decodeHexAsPowerOfTwoSet(user.permissions))
    .some((p) => permissions.get(p) === assertedPermission);
};
