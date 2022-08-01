import { PermissionCodec } from '@project-starter/shared';
import { hash } from 'bcrypt';
import { Exclude, instanceToPlain } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinTable, ManyToMany,
} from 'typeorm';
import { Permission } from './Permission';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @IsNotEmpty()
  @Column({ unique: true })
  @MinLength(4)
  @MaxLength(20)
  username: string

  @IsEmail()
  @Column({ unique: true })
  email: string

  @Exclude()
  @IsNotEmpty()
  @Column()
  password: string

  @IsNotEmpty()
  @Column()
  name: string

  @Column({ nullable: true })
  lastName?: string

  @Column({ nullable: true })
  image?: string

  @Exclude()
  @ManyToMany(() => Permission, (permission) => permission.users)
  @JoinTable()
  permissions?: Permission[];

  @Column({ default: new Date() })
  createdAt: Date

  get encodedPermissions() {
    if (this.permissions) {
      const perms = this.permissions.map((p) => p?.name ?? '');
      return PermissionCodec.encode(perms);
    }

    return '';
  }

  toJSON() {
    return {
      ...instanceToPlain(this),
      encodedPermissions: this.encodedPermissions,
    };
  }

  async setPassword(plain: string) {
    this.password = await hash(plain, 12);
  }
}
