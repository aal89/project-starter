import { Permission as PermissionShared } from '@project-starter/shared/build';
import { MigrationInterface } from 'typeorm';
import { Permission } from '../entities/Permission';
import { User } from '../entities/User';

export class InitialSeed1664141688995 implements MigrationInterface {
  public async up(): Promise<void> {
    const canLogin = new Permission();
    canLogin.name = PermissionShared.LOGIN;
    await canLogin.save();

    const canAdministrate = new Permission();
    canAdministrate.name = PermissionShared.ADMINISTRATE;
    await canAdministrate.save();

    const user = new User();
    user.username = 'admin';
    user.name = 'admin';
    user.email = 'admin@localhost.com';
    user.permissions = [
      canAdministrate,
      canLogin,
    ];
    await user.setPassword('Fdk3zsYsSzVyt6j');
    await user.save();

    const test = new User();
    test.username = 'test';
    test.name = 'test';
    test.email = 'test@localhost.com';
    test.lastOnlineAt = new Date('2000');
    test.createdAt = new Date('2000');
    test.permissions = [
      canLogin,
    ];
    await test.setPassword('Fdk3zsYsSzVyt6j');
    await test.save();
  }

  public async down(): Promise<void> {
    const admin = await User.findOneBy({ username: 'admin' });
    await admin?.remove();

    const test = await User.findOneBy({ username: 'test' });
    await test?.remove();

    const canLogin = await Permission.findOneBy({ name: 'can:login' });
    await canLogin?.remove();

    const canAdministrate = await Permission.findOneBy({ name: 'can:administrate' });
    await canAdministrate?.remove();
  }
}
