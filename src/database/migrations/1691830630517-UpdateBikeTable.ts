import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBikeTable1691830630517 implements MigrationInterface {
  name = 'UpdateBikeTable1691830630517';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bike" DROP COLUMN "bikePrice"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bike" ADD "bikePrice" integer`);
  }
}
