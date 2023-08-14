import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePricingTable1691841826820 implements MigrationInterface {
  name = 'UpdatePricingTable1691841826820';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pricing" ADD "freeThreshold" integer`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pricing" DROP COLUMN "freeThreshold"`,
    );
  }
}
