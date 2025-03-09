import { MigrationInterface, QueryRunner } from 'typeorm';
import { CoffeeType } from '../coffee/entities/coffee.entity';

export class SeedCoffees1709913600000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO coffees (id, name, description, type, price, "imageUrl", "createdAt", "updatedAt")
      VALUES 
        (
          'f47ac10b-58cc-4372-a567-0e02b2c3d479',
          'Ethiopian Yirgacheffe',
          'A light to medium roasted Arabic coffee with delicate floral and citrus notes',
          '${CoffeeType.Arabic}',
          15.99,
          'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
          NOW(),
          NOW()
        ),
        (
          'f47ac10b-58cc-4372-a567-0e02b2c3d480',
          'Vietnamese Robusta',
          'Strong and bold Robusta coffee with intense flavor and high caffeine content',
          '${CoffeeType.Robusta}',
          12.99,
          'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800',
          NOW(),
          NOW()
        ),
        (
          'f47ac10b-58cc-4372-a567-0e02b2c3d481',
          'Kenya AA Arabic',
          'Premium Arabic coffee with wine-like acidity and sweet fruit notes',
          '${CoffeeType.Arabic}',
          18.99,
          'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800',
          NOW(),
          NOW()
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM coffees`);
  }
}
