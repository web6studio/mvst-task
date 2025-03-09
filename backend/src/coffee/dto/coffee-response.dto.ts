import { Exclude, Expose } from 'class-transformer';
import { CoffeeType } from '../entities/coffee.entity';

@Exclude()
export class CoffeeResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  type: CoffeeType;

  @Expose()
  price: number;

  @Expose()
  imageUrl: string;

  @Expose()
  createdAt: Date;

  constructor(partial: Partial<CoffeeResponseDto>) {
    Object.assign(this, partial);
  }
}
