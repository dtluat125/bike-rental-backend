import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDockTable1692374825510 implements MigrationInterface {
  name = 'UpdateDockTable1692374825510';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "dock" ADD "walkingDistance" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "dock" DROP COLUMN "walkingDistance"`);
  }
}
