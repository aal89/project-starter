import { encodePermissions } from '@project-starter/shared';
import { MemoizeExpiring } from 'typescript-memoize';
import { User } from '../entities/User';

export class PermissionsHelper {
  // it takes about x mins for changed permissions to take effect
  @MemoizeExpiring(10 * 60 * 1000, (user) => {
    return user.id;
  })
  public static get(user: User) {
    if (user.roles && user.roles.every((role) => role.permissions)) {
      const perms = user.roles.flatMap((role) => role.permissions).map((p) => p.name);
      return encodePermissions(perms);
    }

    return '';
  }
}
