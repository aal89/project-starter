import { Permission as PermissionShared } from '@project-starter/shared';
import { MigrationInterface } from 'typeorm';
import { Permission } from '../entities/Permission';
import { Role } from '../entities/Role';
import { User } from '../entities/User';

export class InitialSeed1655475766558 implements MigrationInterface {
  public async up(): Promise<void> {
    const canLogin = new Permission();
    canLogin.name = PermissionShared.LOGIN;
    await canLogin.save();

    const canAdministrate = new Permission();
    canAdministrate.name = PermissionShared.ADMINISTRATE;
    await canAdministrate.save();

    const adminRole = new Role();
    adminRole.name = 'Administrator';
    adminRole.permissions = [
      canAdministrate,
    ];
    await adminRole.save();

    const loginRole = new Role();
    loginRole.name = 'Login';
    loginRole.permissions = [
      canLogin,
    ];
    await loginRole.save();

    const user = new User();
    user.username = 'admin';
    user.name = 'admin';
    user.roles = [
      adminRole,
      loginRole,
    ];
    await user.setPassword('Fdk3zsYsSzVyt6j');
    await user.save();

    const test = new User();
    test.username = 'test';
    test.name = 'test';
    test.roles = [
      loginRole,
    ];
    await test.setPassword('Fdk3zsYsSzVyt6j');
    await test.save();
  }

  public async down(): Promise<void> {
    const admin = await User.findOneBy({ username: 'admin' });
    await admin?.remove();

    const test = await User.findOneBy({ username: 'test' });
    await test?.remove();

    const adminRole = await Role.findOneBy({ name: 'Administrator' });
    await adminRole?.remove();

    const loginRole = await Role.findOneBy({ name: 'Login' });
    await loginRole?.remove();

    const canLogin = await Permission.findOneBy({ name: 'can:login' });
    await canLogin?.remove();

    const canAdministrate = await Permission.findOneBy({ name: 'can:administrate' });
    await canAdministrate?.remove();
  }
}
