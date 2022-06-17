import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './Permission';
import { User } from './User';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Permission, { cascade: ['remove'] })
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
