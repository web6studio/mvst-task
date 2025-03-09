import {
  IsString,
  IsEnum,
  IsNumber,
  IsUrl,
  MinLength,
  Min,
} from 'class-validator';
import { CoffeeType } from '../entities/coffee.entity';

export class CreateCoffeeDto {
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  description: string;

  @IsEnum(CoffeeType)
  type: CoffeeType;

  @IsNumber()
  @Min(0, { message: 'Price must be greater than 0' })
  price: number;

  @IsUrl({}, { message: 'Image URL must be a valid URL' })
  imageUrl: string;
}
