import { MigrationInterface } from 'typeorm';
import { User } from '../entities/User';

export class InitialSeed1655475766558 implements MigrationInterface {
  public async up(): Promise<void> {
    const user = new User();
    user.username = 'admin';
    user.name = 'admin';
    await user.setPassword('Fdk3zsYsSzVyt6j');
    await user.save();
  }

  public async down(): Promise<void> {
    const admin = await User.findOneBy({ username: 'admin' });

    await admin?.remove();
  }
}
