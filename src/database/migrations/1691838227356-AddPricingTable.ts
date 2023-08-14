import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPricingTable1691838227356 implements MigrationInterface {
  name = 'AddPricingTable1691838227356';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pricing" ("id" SERIAL NOT NULL, "active" boolean NOT NULL DEFAULT false, "description" character varying NOT NULL, "basePrice" integer NOT NULL, "additionalPrice" integer NOT NULL, "timeThreshold" integer NOT NULL, "lateFee" integer NOT NULL, "refundRate" integer NOT NULL, "refundThreshold" integer NOT NULL, CONSTRAINT "PK_4f6e9c88033106a989aa7ce9dee" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pricing"`);
  }
}
