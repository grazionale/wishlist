import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTableProduct1630760242505 implements MigrationInterface {
  name = 'CreateTableProduct1630760242505'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "product" ("id" SERIAL NOT NULL, "integration_id" character varying NOT NULL, "title" character varying NOT NULL, "price" numeric NOT NULL, "image" character varying NOT NULL, CONSTRAINT "UQ_4f90e17acdad5f992f58a49f622" UNIQUE ("integration_id"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "product"')
  }
}
