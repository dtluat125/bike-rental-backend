import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBikeTable1691830555978 implements MigrationInterface {
  name = 'UpdateBikeTable1691830555978';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bike" ADD "bikePrice" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bike" DROP COLUMN "bikePrice"`);
  }
}
