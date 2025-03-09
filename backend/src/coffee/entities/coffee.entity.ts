import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum CoffeeType {
  Arabic = 'Arabic',
  Robusta = 'Robusta',
}

@Entity('coffees')
export class Coffee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: CoffeeType,
    default: CoffeeType.Arabic,
  })
  type: CoffeeType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
