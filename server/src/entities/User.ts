import { PermissionCodec } from '@project-starter/shared/build';
import { hash } from 'bcrypt';
import { Exclude, instanceToPlain } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
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

  @Column({ nullable: true, unique: true })
  image?: string

  @Exclude()
  @ManyToMany(() => Permission, (permission) => permission.users)
  @JoinTable()
  permissions?: Permission[];

  @Column({ default: new Date() })
  lastOnlineAt: Date

  @Column({ default: new Date() })
  createdAt: Date

  get encodedPermissions() {
    if (this.permissions) {
      const perms = this.permissions.map((p) => p?.name ?? '');
      return PermissionCodec.encode(perms);
    }

    return '';
  }

  async setPassword(plain: string) {
    this.password = await hash(plain, 12);
  }

  setImage(image?: string | null) {
    const oldImage = this.image;
    this.image = image ?? undefined;

    return {
      oldImage,
      newImage: this.image,
      changedImage: oldImage !== this.image,
    };
  }

  toJSON() {
    return {
      ...instanceToPlain(this),
      encodedPermissions: this.encodedPermissions,
    };
  }
}
