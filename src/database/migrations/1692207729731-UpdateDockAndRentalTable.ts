import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDockAndRentalTable1692207729731
  implements MigrationInterface
{
  name = 'UpdateDockAndRentalTable1692207729731';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dock" ADD "dockArea" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "dock" ADD "totalPoints" integer`);
    await queryRunner.query(
      `ALTER TABLE "dock" ALTER COLUMN "name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "dock" ALTER COLUMN "location" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dock" ALTER COLUMN "location" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "dock" ALTER COLUMN "name" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "dock" DROP COLUMN "totalPoints"`);
    await queryRunner.query(`ALTER TABLE "dock" DROP COLUMN "dockArea"`);
  }
}
