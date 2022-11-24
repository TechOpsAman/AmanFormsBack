import request = require('supertest');
import mongoose from 'mongoose';
import { Server } from '../server';
import { config } from '../config';
import { testsValues } from '../utils/mocks';
import { ValidationError } from '../utils/errors/questions';
import { CompositorManager } from './compositor.manager';

const basePath = '/api/compositor';

const {
  db: { connectionString, dbName },
} = config;

describe('Questions Router Module', () => {
  let server: Server;

  beforeAll(async () => {
    await mongoose.connect(connectionString, { dbName });
    await mongoose.connection.dropDatabase();
    server = Server.startServer();
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    server.closeServer();
  });

  it('gets the test endpoint', async () => {});
});
