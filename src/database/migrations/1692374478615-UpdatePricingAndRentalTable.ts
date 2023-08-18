import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePricingAndRentalTable1692374478615
  implements MigrationInterface
{
  name = 'UpdatePricingAndRentalTable1692374478615';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rental" ADD "pricingId" integer`);
    await queryRunner.query(
      `ALTER TABLE "pricing" ALTER COLUMN "active" SET DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "rental" ADD CONSTRAINT "FK_3a8804dc6f17af5e494f38a5c1b" FOREIGN KEY ("pricingId") REFERENCES "pricing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rental" DROP CONSTRAINT "FK_3a8804dc6f17af5e494f38a5c1b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pricing" ALTER COLUMN "active" SET DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "rental" DROP COLUMN "pricingId"`);
  }
}
