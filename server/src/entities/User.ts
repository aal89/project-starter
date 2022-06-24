import { hash } from 'bcrypt';
import { Exclude, instanceToPlain } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';
import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinTable, ManyToMany,
} from 'typeorm';
import { encodePowerOfTwoSetAsHex } from '../utils/powerSet';
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

  get permissions() {
    if (this.roles) {
      const permissionIds = new Set(this.permissionIds.map(BigInt));
      return encodePowerOfTwoSetAsHex(permissionIds);
    }

    return '';
  }

  get permissionIds() {
    return this.roles
      .flatMap((role) => role.permissions)
      .map((permission) => permission.encodeId);
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
