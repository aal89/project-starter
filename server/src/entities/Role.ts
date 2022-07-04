import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './Permission';
import { User } from './User';

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable()
  permissions?: Permission[];

  @ManyToMany(() => User, (user) => user.roles, { onDelete: 'RESTRICT' })
  users: User[];
}
