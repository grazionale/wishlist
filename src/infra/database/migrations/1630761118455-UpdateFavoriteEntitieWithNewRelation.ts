import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateFavoriteEntitieWithNewRelation1630761118455 implements MigrationInterface {
  name = 'UpdateFavoriteEntitieWithNewRelation1630761118455'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "public"."IDX_44d591fdf57b16faa1eaba2320"')
    await queryRunner.query('ALTER TABLE "public"."favorite" RENAME COLUMN "external_product_id" TO "product_id"')
    await queryRunner.query('ALTER TABLE "public"."favorite" DROP COLUMN "product_id"')
    await queryRunner.query('ALTER TABLE "public"."favorite" ADD "product_id" integer NOT NULL')
    await queryRunner.query('ALTER TABLE "public"."favorite" ADD CONSTRAINT "FK_b3e2e24d544d819cae3679b4084" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "public"."favorite" DROP CONSTRAINT "FK_b3e2e24d544d819cae3679b4084"')
    await queryRunner.query('ALTER TABLE "public"."favorite" DROP COLUMN "product_id"')
    await queryRunner.query('ALTER TABLE "public"."favorite" ADD "product_id" character varying NOT NULL')
    await queryRunner.query('ALTER TABLE "public"."favorite" RENAME COLUMN "product_id" TO "external_product_id"')
    await queryRunner.query('CREATE INDEX "IDX_44d591fdf57b16faa1eaba2320" ON "public"."favorite" ("external_product_id") ')
  }
}
