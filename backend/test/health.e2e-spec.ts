// test/health.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import request from 'supertest';
import { describe, it } from 'node:test';

describe('Health', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api/health/ping', () => {
    const url = '/api/health/ping';

    // 👇 1
    it('should return pong', async () => {
      const response = await request(app.getHttpServer()).get(url); // 👈 2

      expect(response.statusCode).toBe(200); // 👈 3
      expect(response.body).toEqual({ pong: true }); // 👈 3
    });
  });
});
