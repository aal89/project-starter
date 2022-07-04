import { PermissionCodec } from '@project-starter/shared';
import { hash } from 'bcrypt';
import { Exclude, instanceToPlain } from 'class-transformer';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinTable, ManyToMany,
} from 'typeorm';
import { Role } from './Role';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @IsNotEmpty()
  @Column({ unique: true })
  @MinLength(4)
  @MaxLength(20)
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

  @Column({ nullable: true })
  image?: string

  @Exclude()
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles?: Role[];

  get permissions() {
    if (this.roles && this.roles.every((role) => role.permissions)) {
      const perms = this.roles.flatMap((role) => role.permissions).map((p) => p?.name ?? '');
      return PermissionCodec.encode(perms);
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
