import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTableFavorite1630496205647 implements MigrationInterface {
  name = 'CreateTableFavorite1630496205647'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "favorite" ("id" SERIAL NOT NULL, "external_product_id" character varying NOT NULL, "client_id" integer NOT NULL, CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE INDEX "IDX_44d591fdf57b16faa1eaba2320" ON "favorite" ("external_product_id") ')
    await queryRunner.query('ALTER TABLE "favorite" ADD CONSTRAINT "FK_49930af36e994596d1d62b4b096" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "favorite" DROP CONSTRAINT "FK_49930af36e994596d1d62b4b096"')
    await queryRunner.query('DROP INDEX "IDX_44d591fdf57b16faa1eaba2320"')
    await queryRunner.query('DROP TABLE "favorite"')
  }
}
