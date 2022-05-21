import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column({ nullable: true })
  lastName?: string

  @Column()
  email: string

  @Column()
  password: string
}
