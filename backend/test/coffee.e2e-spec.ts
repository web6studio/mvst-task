import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CoffeeType } from '../src/coffee/entities/coffee.entity';
import { validationConfig } from '../src/config/validation.config';

describe('CoffeeController (e2e)', () => {
  let app: INestApplication;
  let createdCoffeeId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe(validationConfig));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/coffees (POST) - should create new coffee', () => {
    return request(app.getHttpServer())
      .post('/coffees')
      .send({
        name: 'E2E Test Coffee',
        description: 'Created during e2e testing',
        type: CoffeeType.Arabic,
        price: 12.99,
        imageUrl: 'http://test.com/coffee.jpg',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('E2E Test Coffee');
        createdCoffeeId = res.body.id;
      });
  });

  it('/coffees (GET) - should return array of coffees', () => {
    return request(app.getHttpServer())
      .get('/coffees')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  it('/coffees/:id (GET) - should return coffee by id', () => {
    return request(app.getHttpServer())
      .get(`/coffees/${createdCoffeeId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdCoffeeId);
        expect(res.body.name).toBe('E2E Test Coffee');
      });
  });

  it('/coffees/:id (GET) - should return 404 for invalid id', () => {
    return request(app.getHttpServer()).get('/coffees/invalid-id').expect(404);
  });

  it('/coffees/:id (PUT) - should update coffee', () => {
    return request(app.getHttpServer())
      .put(`/coffees/${createdCoffeeId}`)
      .send({
        name: 'Updated E2E Coffee',
        price: 14.99,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe('Updated E2E Coffee');
        expect(res.body.price).toBe(14.99);
      });
  });

  it('/coffees/:id (DELETE) - should delete coffee', () => {
    return request(app.getHttpServer())
      .delete(`/coffees/${createdCoffeeId}`)
      .expect(204);
  });

  it('/coffees/:id (GET) - should return 404 after deletion', () => {
    return request(app.getHttpServer())
      .get(`/coffees/${createdCoffeeId}`)
      .expect(404);
  });
});
