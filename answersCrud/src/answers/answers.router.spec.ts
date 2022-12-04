import request = require('supertest');
import mongoose from 'mongoose';
import { Server } from '../server';
import { config } from '../config';
import {
  validSurvey,
  validSurveyId,
  validUserId,
  validContent1,
  invalidSurveyId,
} from '../utils/mocks';
import { ValidationError } from '../utils/errors/answer';
import { AnswerManager } from './answers.manager';

const basePath = '/api/answers';

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

  it('gets the test endpoint', async () => { });

  describe('#Post /api/answers/', () => {
    test('Should return the created survey', async () => {
      const response = await request(server.app)
        .post(`${basePath}/`)
        .send({
          surveyId: validSurveyId,
          userId: validUserId,
          content: validContent1
        });
      console.log('response--->', response.status);
      expect(response.status).toEqual(200);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toBeDefined();
      expect(response.body.id).toBeDefined();
    });

    test('Should throw ValidationError', async () => {
      try {
        await request(server.app).post(`${basePath}/`).send({
          surveyId: validSurveyId,
          userId: validUserId,
          content: '',
        });
      } catch (err) {
        expect(err).toBeInstanceOf(ValidationError);
      }
    });
  });

  describe('#Get /api/answers/getSurveysById', () => {
    test('Should return the survey', async () => {
      const survey = await AnswerManager.create(
        validSurvey
      );

      const response = await request(server.app).get(
        `${basePath}/getSurveysById?surveyId=${survey.surveyId}`,
      );

      expect(response.status).toEqual(200);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toBeDefined();
      expect(response.body[0].surveyId).toEqual(survey.surveyId);
    });

    test('Should throw ValidationError', async () => {
      try {
        await request(server.app).post(
          `${basePath}/getSurveysById?surveyId=${invalidSurveyId}`,
        );
      } catch (err) {
        expect(err).toBeInstanceOf(ValidationError);
      }
    });
  });


  describe('#Delete /api/answers/deleteSurveysById', () => {
    test('Should delete the survey', async () => {
      const survey = await AnswerManager.create(
        validSurvey,
      );

      const response = await request(server.app)
        .delete(`${basePath}/deleteSurveysById?surveyId=${survey.surveyId}`)

      expect(response.status).toEqual(200);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toBeDefined();
      expect(response.body.surveyId).toEqual(survey.surveyId);
    });

    test('Should throw error if the group id is not valid', async () => {
      try {
        await request(server.app).delete(
          `${basePath}/deleteSurveysById?surveyId=${invalidSurveyId}`,
        );
      } catch (err) {
        expect(err).toBeInstanceOf(ValidationError);
      }
    });
  });

});
