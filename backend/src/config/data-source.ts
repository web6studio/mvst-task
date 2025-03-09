import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { Coffee } from '../coffee/entities/coffee.entity';
import { CreateInfrastructure1709913400000 } from '../migrations/1709913400000-CreateInfrastructure';
import { CreateCoffeeTable1709913500000 } from '../migrations/1709913500000-CreateCoffeeTable';
import { SeedCoffees1709913600000 } from '../migrations/1709913600000-SeedCoffees';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Coffee],
  migrations: [
    CreateInfrastructure1709913400000,
    CreateCoffeeTable1709913500000,
    SeedCoffees1709913600000,
  ],
  synchronize: false,
};

const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;
