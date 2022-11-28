import request = require('supertest');
import mongoose from 'mongoose';
import CompositorService from '../utils/services/compositor.service';
import { Server } from '../server';
import { config } from '../config';
import { testsValues } from '../utils/mocks';
import {
  SurveyQuestionsNotFoundError,
  SurveyAnswersNotFoundError,
} from '../utils/errors/compositor';
import {
  ISection,
  IQuestion,
  ISurveyAnswers,
  ISurveyQuestions,
} from './interfaces/compositor.interface';

const basePath = '/api/compositor';

const {
  db: { connectionString },
} = config;

describe('Compositor Router Module', () => {
  let server: Server;

  beforeAll(async () => {
    await mongoose.connect(connectionString);
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

  describe('#Delete /api/compositor/deleteSurvey', () => {
    test('Should return the survey questions an answers', async () => {
      const createdSurvey = await CompositorService.createSurvey(
        {},
        testsValues.questionsValues.validSurveyName1,
        testsValues.questionsValues.validCreatorId,
        testsValues.questionsValues.validContent1 as IQuestion[],
        {
          answersContent: testsValues.answersValues.validSurvey
            .content as Array<ISection>,
          userId: testsValues.answersValues.validSurvey.userId as string,
        } as Omit<ISurveyAnswers, 'surveyId'>
      );

      const response = await request(server.app).delete(
        `${basePath}/deleteSurvey?surveyId=${
          (createdSurvey![0] as ISurveyQuestions).id
        }`
      );
      console.log(response.body);

      expect(response.status).toEqual(200);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toBeDefined();
      expect(response.body.id).toEqual(
        (createdSurvey![0] as ISurveyQuestions).id
      );
    });

    test('Should throw survey questions not found or survey answers not found error', async () => {
      try {
        await request(server.app).delete(
          `${basePath}/deleteSurvey?surveyId=${testsValues.questionsValues.invalidSurveyId}`
        );
      } catch (err) {
        expect(err).toBeInstanceOf(
          SurveyQuestionsNotFoundError || SurveyAnswersNotFoundError
        );
      }
    });
  });

  describe('#Get /api/compositor/getSurveyResults', () => {
    test('Should return the survey questions an answers', async () => {
      const createdSurvey = await CompositorService.createSurvey(
        {},
        testsValues.questionsValues.validSurveyName1,
        testsValues.questionsValues.validCreatorId,
        testsValues.questionsValues.validContent1 as IQuestion[],
        {
          answersContent: testsValues.answersValues.validSurvey
            .content as Array<ISection>,
          userId: testsValues.answersValues.validSurvey.userId as string,
        } as Omit<ISurveyAnswers, 'surveyId'>
      );

      const response = await request(server.app).get(
        `${basePath}/getSurveyResults?surveyId=${
          (createdSurvey![0] as ISurveyQuestions).id
        }`
      );
      console.log(response.body);

      expect(response.status).toEqual(200);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toBeDefined();
      expect(response.body.id).toEqual(
        (createdSurvey![0] as ISurveyQuestions).id
      );
    });

    test('Should throw survey questions not found or survey answers not found error', async () => {
      try {
        await request(server.app).delete(
          `${basePath}/getSurveyResults?surveyId=${testsValues.questionsValues.invalidSurveyId}`
        );
      } catch (err) {
        expect(err).toBeInstanceOf(
          SurveyQuestionsNotFoundError || SurveyAnswersNotFoundError
        );
      }
    });
  });
});
