import { MigrationInterface } from 'typeorm';
import { Permission } from '../entities/Permission';
import { Role } from '../entities/Role';
import { User } from '../entities/User';

export class InitialSeed1655475766558 implements MigrationInterface {
  public async up(): Promise<void> {
    const canLogin = new Permission();
    canLogin.name = 'can:login';
    canLogin.encodeId = '1';
    await canLogin.save();

    const canAdministrate = new Permission();
    canAdministrate.name = 'can:administrate';
    canAdministrate.encodeId = '2';
    await canAdministrate.save();

    const adminRole = new Role();
    adminRole.name = 'Administrator';
    adminRole.permissions = [
      canLogin,
      canAdministrate,
    ];
    await adminRole.save();

    const user = new User();
    user.username = 'admin';
    user.name = 'admin';
    user.roles = [
      adminRole,
    ];
    await user.setPassword('Fdk3zsYsSzVyt6j');
    await user.save();
  }

  public async down(): Promise<void> {
    const admin = await User.findOneBy({ username: 'admin' });
    await admin?.remove();

    const adminRole = await Role.findOneBy({ name: 'Administrator' });
    await adminRole?.remove();

    const canLogin = await Permission.findOneBy({ name: 'can:login' });
    await canLogin?.remove();

    const canAdministrate = await Permission.findOneBy({ name: 'can:administrate' });
    await canAdministrate?.remove();
  }
}
