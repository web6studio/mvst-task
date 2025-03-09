import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCoffeeTable1709913500000 implements MigrationInterface {
  name = 'CreateCoffeeTable1709913500000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "coffee_type_enum" AS ENUM ('Arabic', 'Robusta');

      CREATE TABLE "coffees" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "description" text NOT NULL,
        "type" "coffee_type_enum" NOT NULL DEFAULT 'Arabic',
        "price" decimal(10,2) NOT NULL,
        "imageUrl" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_coffees_name" UNIQUE ("name"),
        CONSTRAINT "PK_coffees_id" PRIMARY KEY ("id")
      );

      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "coffees" CASCADE`);
  }
}
