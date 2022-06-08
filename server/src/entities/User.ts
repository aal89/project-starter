import { Exclude, instanceToPlain } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';
import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @IsNotEmpty()
  @Column({ unique: true })
  username: string

  @Exclude()
  @MinLength(100)
  @IsNotEmpty()
  @Column()
  password: string

  @IsNotEmpty()
  @Column()
  name: string

  @Column({ nullable: true })
  lastName?: string

  toJSON() {
    return instanceToPlain(this);
  }
}
