import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabase1664141688895 implements MigrationInterface {
  name = 'CreateDatabase1664141688895';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "lastName" character varying, "image" character varying, "lastOnlineAt" TIMESTAMP NOT NULL DEFAULT \'"2022-09-25T21:34:49.659Z"\', "createdAt" TIMESTAMP NOT NULL DEFAULT \'"2022-09-25T21:34:49.659Z"\', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_3bd3f2e16165d1dac3e8e132863" UNIQUE ("image"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "permission" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE ("name"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "user_permissions_permission" ("userId" uuid NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_8dd49853fbad35f9a0f91b11877" PRIMARY KEY ("userId", "permissionId"))',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_5b72d197d92b8bafbe7906782e" ON "user_permissions_permission" ("userId") ',
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_c43a6a56e3ef281cbfba9a7745" ON "user_permissions_permission" ("permissionId") ',
    );
    await queryRunner.query(
      'ALTER TABLE "user_permissions_permission" ADD CONSTRAINT "FK_5b72d197d92b8bafbe7906782ec" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "user_permissions_permission" ADD CONSTRAINT "FK_c43a6a56e3ef281cbfba9a77457" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE RESTRICT ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "query-result-cache"');
    await queryRunner.query(
      'ALTER TABLE "user_permissions_permission" DROP CONSTRAINT "FK_c43a6a56e3ef281cbfba9a77457"',
    );
    await queryRunner.query(
      'ALTER TABLE "user_permissions_permission" DROP CONSTRAINT "FK_5b72d197d92b8bafbe7906782ec"',
    );
    await queryRunner.query('DROP INDEX "public"."IDX_c43a6a56e3ef281cbfba9a7745"');
    await queryRunner.query('DROP INDEX "public"."IDX_5b72d197d92b8bafbe7906782e"');
    await queryRunner.query('DROP TABLE "user_permissions_permission"');
    await queryRunner.query('DROP TABLE "permission"');
    await queryRunner.query('DROP TABLE "user"');
  }
}
