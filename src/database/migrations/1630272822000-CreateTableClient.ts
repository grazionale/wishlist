import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTableClient1630272822000 implements MigrationInterface {
  name = 'CreateTableClient1630272822000'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "client" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE INDEX "IDX_480f88a019346eae487a0cd7f0" ON "client" ("name") ')
    await queryRunner.query('CREATE UNIQUE INDEX "IDX_6436cc6b79593760b9ef921ef1" ON "client" ("email") ')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "IDX_6436cc6b79593760b9ef921ef1"')
    await queryRunner.query('DROP INDEX "IDX_480f88a019346eae487a0cd7f0"')
    await queryRunner.query('DROP TABLE "client"')
  }
}
