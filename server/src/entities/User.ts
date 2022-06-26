import { encodePermissions } from '@project-starter/shared';
import { hash } from 'bcrypt';
import { Exclude, instanceToPlain } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';
import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinTable, ManyToMany,
} from 'typeorm';
import { MemoizeExpiring } from 'typescript-memoize';
import { Role } from './Role';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @IsNotEmpty()
  @Column({ unique: true })
  @MinLength(4)
  username: string

  @Exclude()
  @IsNotEmpty()
  @Column()
  password: string

  @IsNotEmpty()
  @Column()
  name: string

  @Column({ nullable: true })
  lastName?: string

  @Exclude()
  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable()
  roles: Role[];

  // it takes about x mins for changed permissions to take effect
  @MemoizeExpiring(10 * 60 * 1000)
  get permissions() {
    if (this.roles && this.roles.every((role) => role.permissions)) {
      const perms = this.roles.flatMap((role) => role.permissions).map((p) => p.name);
      return encodePermissions(perms);
    }

    return '';
  }

  toJSON() {
    return {
      ...instanceToPlain(this),
      permissions: this.permissions,
    };
  }

  async setPassword(plain: string) {
    this.password = await hash(plain, 12);
  }
}
