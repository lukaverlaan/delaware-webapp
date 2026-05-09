import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { beforeEach, describe, it } from 'node:test';
import { createTestApp } from './helpers/create-app';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createTestApp();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('Health', () => {
    describe('GET /api/health/ping', () => {
      const url = '/api/health/ping';

      it('should return pong', async () => {
        const response = await request(app.getHttpServer()).get(url);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ pong: true });
      });
    });
  });
});
