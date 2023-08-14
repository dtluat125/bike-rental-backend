import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRentalTable1691828547436 implements MigrationInterface {
  name = 'CreateRentalTable1691828547436';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rental" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "rentalDate" TIMESTAMP NOT NULL DEFAULT now(), "returnDate" TIMESTAMP, "amountPaid" integer NOT NULL DEFAULT '0', "bikeId" integer, CONSTRAINT "PK_a20fc571eb61d5a30d8c16d51e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."bike_status_enum" AS ENUM('in_use', 'free', 'not_available')`,
    );
    await queryRunner.query(
      `ALTER TABLE "bike" ADD "status" "public"."bike_status_enum" NOT NULL DEFAULT 'free'`,
    );
    await queryRunner.query(`ALTER TABLE "bike" DROP COLUMN "type"`);
    await queryRunner.query(
      `CREATE TYPE "public"."bike_type_enum" AS ENUM('standard', 'electrical', 'twin')`,
    );
    await queryRunner.query(
      `ALTER TABLE "bike" ADD "type" "public"."bike_type_enum" NOT NULL DEFAULT 'standard'`,
    );
    await queryRunner.query(
      `ALTER TABLE "rental" ADD CONSTRAINT "FK_125757235ef75deb2a91770604c" FOREIGN KEY ("bikeId") REFERENCES "bike"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rental" DROP CONSTRAINT "FK_125757235ef75deb2a91770604c"`,
    );
    await queryRunner.query(`ALTER TABLE "bike" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."bike_type_enum"`);
    await queryRunner.query(
      `ALTER TABLE "bike" ADD "type" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "bike" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."bike_status_enum"`);
    await queryRunner.query(`DROP TABLE "rental"`);
  }
}
