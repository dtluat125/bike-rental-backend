import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBikeTable1691829125835 implements MigrationInterface {
  name = 'UpdateBikeTable1691829125835';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bike" ALTER COLUMN "image" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bike" ALTER COLUMN "image" SET NOT NULL`,
    );
  }
}
