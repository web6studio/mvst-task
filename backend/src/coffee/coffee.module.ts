import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { CoffeeService } from './coffee.service';
import { CoffeeController } from './coffee.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee])],
  providers: [CoffeeService],
  controllers: [CoffeeController],
})
export class CoffeeModule {}
