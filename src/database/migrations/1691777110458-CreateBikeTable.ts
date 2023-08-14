import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBikeTable1691777110458 implements MigrationInterface {
  name = 'CreateBikeTable1691777110458';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bike" ("id" SERIAL NOT NULL, "barcode" character varying NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "image" character varying NOT NULL, "licensePlate" character varying NOT NULL, "battery" integer NOT NULL, "rentingPrice" integer NOT NULL, CONSTRAINT "UQ_a25bd46d3fd497822a71420d3a3" UNIQUE ("barcode"), CONSTRAINT "PK_e4a433f76768045f7a2efca66e2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "bike"`);
  }
}
