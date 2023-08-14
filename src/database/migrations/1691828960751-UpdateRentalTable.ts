import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRentalTable1691828960751 implements MigrationInterface {
  name = 'UpdateRentalTable1691828960751';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rental" ALTER COLUMN "userId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "rental" ADD CONSTRAINT "FK_5c91d10c5ee7afddcb2dbbfbbd0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rental" DROP CONSTRAINT "FK_5c91d10c5ee7afddcb2dbbfbbd0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rental" ALTER COLUMN "userId" SET NOT NULL`,
    );
  }
}
