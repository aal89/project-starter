import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './Role';

@Entity()
export class Permission extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  encodeId: string;

  @ManyToMany(() => Role, (role) => role.permissions, { onDelete: 'RESTRICT' })
  roles: Role[];
}
