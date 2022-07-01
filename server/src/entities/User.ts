import { hash } from 'bcrypt';
import { Exclude, instanceToPlain } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';
import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinTable, ManyToMany,
} from 'typeorm';
import { PermissionsHelper } from '../utils/permissions';
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

  toJSON() {
    return {
      ...instanceToPlain(this),
      permissions: PermissionsHelper.get(this),
    };
  }

  async setPassword(plain: string) {
    this.password = await hash(plain, 12);
  }
}
