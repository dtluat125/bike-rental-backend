import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransactionsTable1691816979454
  implements MigrationInterface
{
  name = 'CreateTransactionsTable1691816979454';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "rentedBikeId" integer NOT NULL, "rentalDate" TIMESTAMP NOT NULL DEFAULT now(), "returnDate" TIMESTAMP, "rentalPrice" integer NOT NULL, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_811ccee1411f5daa8f73899f728" FOREIGN KEY ("rentedBikeId") REFERENCES "bike"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transaction" DROP CONSTRAINT "FK_811ccee1411f5daa8f73899f728"`,
    );
    await queryRunner.query(`DROP TABLE "transaction"`);
  }
}
