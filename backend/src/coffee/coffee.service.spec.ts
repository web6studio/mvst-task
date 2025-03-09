import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoffeeService } from './coffee.service';
import { Coffee } from './entities/coffee.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CoffeeType } from './entities/coffee.entity';

describe('CoffeeService', () => {
  let service: CoffeeService;
  let repository: Repository<Coffee>;

  const mockCoffee = {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    name: 'Test Coffee',
    description: 'Test Description',
    type: CoffeeType.Arabic,
    price: 10.99,
    imageUrl: 'http://test.com/image.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeeService,
        {
          provide: getRepositoryToken(Coffee),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CoffeeService>(CoffeeService);
    repository = module.get<Repository<Coffee>>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of coffees', async () => {
      mockRepository.find.mockResolvedValue([mockCoffee]);
      const result = await service.findAll();
      expect(result).toHaveLength(1);
      expect(mockRepository.find).toHaveBeenCalledWith({
        order: { createdAt: 'DESC' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a coffee by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockCoffee);
      const result = await service.findOne(mockCoffee.id);
      expect(result).toBeDefined();
      expect(result.id).toBe(mockCoffee.id);
    });

    it('should throw NotFoundException for invalid UUID', async () => {
      await expect(service.findOne('invalid-uuid')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException when coffee not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(
        service.findOne('f47ac10b-58cc-4372-a567-0e02b2c3d479'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    const createDto = {
      name: 'New Coffee',
      description: 'New Description',
      type: CoffeeType.Arabic,
      price: 15.99,
      imageUrl: 'http://test.com/new.jpg',
    };

    it('should create a new coffee', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue(createDto);
      mockRepository.save.mockResolvedValue({ ...createDto, id: 'new-id' });

      const result = await service.create(createDto);
      expect(result).toBeDefined();
      expect(result.name).toBe(createDto.name);
    });

    it('should throw ConflictException when coffee with same name exists', async () => {
      mockRepository.findOne.mockResolvedValue(mockCoffee);
      await expect(service.create(createDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('update', () => {
    const updateDto = { name: 'Updated Coffee' };

    it('should update an existing coffee', async () => {
      mockRepository.findOne
        .mockResolvedValueOnce(mockCoffee) // for findOneEntity
        .mockResolvedValueOnce(null); // for name check
      mockRepository.save.mockResolvedValue({ ...mockCoffee, ...updateDto });

      const result = await service.update(mockCoffee.id, updateDto);
      expect(result).toBeDefined();
      expect(result.name).toBe(updateDto.name);
    });

    it('should throw ConflictException when updating to existing name', async () => {
      mockRepository.findOne
        .mockResolvedValueOnce(mockCoffee)
        .mockResolvedValueOnce({ id: 'other-id', name: updateDto.name });

      await expect(service.update(mockCoffee.id, updateDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('remove', () => {
    it('should remove an existing coffee', async () => {
      mockRepository.findOne.mockResolvedValue(mockCoffee);
      mockRepository.remove.mockResolvedValue(mockCoffee);

      await expect(service.remove(mockCoffee.id)).resolves.not.toThrow();
      expect(mockRepository.remove).toHaveBeenCalled();
    });

    it('should throw NotFoundException when coffee not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.remove('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
