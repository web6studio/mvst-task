import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInfrastructure1709913400000 implements MigrationInterface {
  name = 'CreateInfrastructure1709913400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create UUID extension
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // Create enum type
    await queryRunner.query(
      `CREATE TYPE "public"."coffee_type_enum" AS ENUM ('Arabic', 'Robusta')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop in reverse order
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."coffee_type_enum"`);
    // We don't drop the uuid-ossp extension as it might be used by other applications
  }
}
