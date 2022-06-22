import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { Permission } from '../entities/Permission';

@EventSubscriber()
export class PermissionSubscriber implements EntitySubscriberInterface<Permission> {
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return Permission;
  }

  /**
   * Called before post insertion.
   */
  async beforeInsert({ entity }: InsertEvent<Permission>) {
    const permissionCount = await Permission.count();
    entity.encodeId = String(2 ** permissionCount);
  }
}
