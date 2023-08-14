import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDockTable1691779118125 implements MigrationInterface {
  name = 'CreateDockTable1691779118125';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dock" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_dec6a8592c6836aa3105f9bcdb9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "bike" ADD "dockId" integer`);
    await queryRunner.query(
      `ALTER TABLE "bike" ADD CONSTRAINT "FK_4fe57b9b016240d994e6df71f06" FOREIGN KEY ("dockId") REFERENCES "dock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bike" DROP CONSTRAINT "FK_4fe57b9b016240d994e6df71f06"`,
    );
    await queryRunner.query(`ALTER TABLE "bike" DROP COLUMN "dockId"`);
    await queryRunner.query(`DROP TABLE "dock"`);
  }
}
