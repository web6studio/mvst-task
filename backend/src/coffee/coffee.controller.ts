import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { CoffeeResponseDto } from './dto/coffee-response.dto';

@Controller('coffees')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<CoffeeResponseDto[]> {
    return this.coffeeService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<CoffeeResponseDto> {
    return this.coffeeService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(new ValidationPipe()) createCoffeeDto: CreateCoffeeDto,
  ): Promise<CoffeeResponseDto> {
    return this.coffeeService.create(createCoffeeDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateCoffeeDto: Partial<CreateCoffeeDto>,
  ): Promise<CoffeeResponseDto> {
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.coffeeService.remove(id);
  }
}
