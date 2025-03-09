import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { CoffeeResponseDto } from './dto/coffee-response.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class CoffeeService {
  private readonly logger = new Logger(CoffeeService.name);

  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async findAll(): Promise<CoffeeResponseDto[]> {
    this.logger.log('Fetching all coffees');
    try {
      const coffees = await this.coffeeRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });
      this.logger.debug(`Found ${coffees.length} coffees`);
      return coffees.map((coffee) => new CoffeeResponseDto(coffee));
    } catch (error) {
      this.logger.error('Failed to fetch coffees', error.stack);
      throw new InternalServerErrorException(
        'Error fetching coffees from database',
      );
    }
  }

  private async findOneEntity(id: string): Promise<Coffee> {
    this.logger.debug(`Finding coffee with id: ${id}`);
    // Validate UUID format first
    if (!isUUID(id)) {
      this.logger.warn(`Invalid UUID format: ${id}`);
      throw new NotFoundException(`Coffee with ID '${id}' was not found`);
    }

    const coffee = await this.coffeeRepository.findOne({ where: { id } });
    if (!coffee) {
      this.logger.warn(`Coffee with ID ${id} not found`);
      throw new NotFoundException(`Coffee with ID '${id}' was not found`);
    }
    return coffee;
  }

  async findOne(id: string): Promise<CoffeeResponseDto> {
    const coffee = await this.findOneEntity(id);
    this.logger.debug(`Found coffee: ${coffee.name}`);
    return new CoffeeResponseDto(coffee);
  }

  async create(createCoffeeDto: CreateCoffeeDto): Promise<CoffeeResponseDto> {
    this.logger.log(`Creating new coffee: ${createCoffeeDto.name}`);
    const existingCoffee = await this.coffeeRepository.findOne({
      where: { name: createCoffeeDto.name },
    });

    if (existingCoffee) {
      this.logger.warn(
        `Attempted to create duplicate coffee: ${createCoffeeDto.name}`,
      );
      throw new ConflictException(
        `Coffee with name '${createCoffeeDto.name}' already exists`,
      );
    }

    try {
      const coffee = this.coffeeRepository.create(createCoffeeDto);
      const savedCoffee = await this.coffeeRepository.save(coffee);
      this.logger.log(`Successfully created coffee: ${savedCoffee.name}`);
      return new CoffeeResponseDto(savedCoffee);
    } catch (error) {
      this.logger.error('Failed to create coffee', error.stack);
      throw new InternalServerErrorException('Error creating new coffee');
    }
  }

  async update(
    id: string,
    updateCoffeeDto: Partial<CreateCoffeeDto>,
  ): Promise<CoffeeResponseDto> {
    this.logger.log(`Updating coffee ${id}`);
    // This will throw NotFoundException if coffee doesn't exist
    const coffee = await this.findOneEntity(id);

    // If name is being updated, check for duplicates
    if (updateCoffeeDto.name && updateCoffeeDto.name !== coffee.name) {
      this.logger.debug(`Checking for name conflicts: ${updateCoffeeDto.name}`);
      const existingCoffee = await this.coffeeRepository.findOne({
        where: { name: updateCoffeeDto.name },
      });

      if (existingCoffee) {
        this.logger.warn(
          `Attempted to update to existing name: ${updateCoffeeDto.name}`,
        );
        throw new ConflictException(
          `Coffee with name '${updateCoffeeDto.name}' already exists`,
        );
      }
    }

    try {
      const updatedCoffee = await this.coffeeRepository.save({
        ...coffee,
        ...updateCoffeeDto,
      });
      this.logger.log(`Successfully updated coffee ${id}`);
      return new CoffeeResponseDto(updatedCoffee);
    } catch (error) {
      this.logger.error(`Failed to update coffee ${id}`, error.stack);
      throw new InternalServerErrorException(
        `Error updating coffee with ID '${id}'`,
      );
    }
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing coffee ${id}`);
    // This will throw NotFoundException if coffee doesn't exist
    const coffee = await this.findOneEntity(id);

    try {
      await this.coffeeRepository.remove(coffee);
      this.logger.log(`Successfully removed coffee ${id}`);
    } catch (error) {
      this.logger.error(`Failed to remove coffee ${id}`, error.stack);
      throw new InternalServerErrorException(
        `Error deleting coffee with ID '${id}'`,
      );
    }
  }
}
