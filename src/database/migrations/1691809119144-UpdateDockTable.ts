import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDockTable1691809119144 implements MigrationInterface {
  name = 'UpdateDockTable1691809119144';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dock" ALTER COLUMN "image" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dock" ALTER COLUMN "image" SET NOT NULL`,
    );
  }
}
