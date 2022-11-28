import request = require('supertest');
import mongoose from 'mongoose';
import { Server } from '../server';
import { config } from '../config';
import { testsValues } from '../utils/mocks';
import {
  SurveyQuestionsNotFoundError,
  SurveyAnswersNotFoundError,
} from '../utils/errors/compositor';
import { ISurveyAnswers } from './interfaces/compositor.interface';
import AnswersService from '../utils/services/answers.service';
import QuestionsService from '../utils/services/questions.service';

const basePath = '/api/compositor';

const {
  db: { connectionString, dbName },
} = config;

describe('Compositor Router Module', () => {
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

  describe('#Delete /api/compositor/deleteSurvey', () => {
    test('Should return the survey questions an answers', async () => {
      const createdSurveyQuestions =
        await QuestionsService.CreateQuestionSurvey(
          {},
          testsValues.questionsValues.validSurveyName1,
          testsValues.questionsValues.validCreatorId,
          testsValues.questionsValues.validContent1
        );

      const answersSurvey: unknown = testsValues.answersValues.validSurvey;
      (answersSurvey as ISurveyAnswers).surveyId =
        createdSurveyQuestions?.id as string;

      const createdSurveyAnswers = await AnswersService.CreateAnswersSurvey(
        {},
        answersSurvey as ISurveyAnswers
      );

      if (!createdSurveyQuestions || !createdSurveyAnswers) {
        fail();
      }
      const response = await request(server.app).delete(
        `${basePath}/deleteSurvey?surveyId=${createdSurveyQuestions!.id}`
      );
      console.log(response.body);

      expect(response.status).toEqual(200);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toBeDefined();
      expect(response.body.id).toEqual(createdSurveyQuestions!.id);
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
      const createdSurveyQuestions =
        await QuestionsService.CreateQuestionSurvey(
          {},
          testsValues.questionsValues.validSurveyName1,
          testsValues.questionsValues.validCreatorId,
          testsValues.questionsValues.validContent1
        );

      const answersSurvey: unknown = testsValues.answersValues.validSurvey;
      (answersSurvey as ISurveyAnswers).surveyId =
        createdSurveyQuestions?.id as string;

      const createdSurveyAnswers = await AnswersService.CreateAnswersSurvey(
        {},
        answersSurvey as ISurveyAnswers
      );

      if (!createdSurveyQuestions || !createdSurveyAnswers) {
        fail();
      }

      const response = await request(server.app).get(
        `${basePath}/getSurveyResults?surveyId=${createdSurveyQuestions!.id}`
      );
      console.log(response.body);

      expect(response.status).toEqual(200);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toBeDefined();
      expect(response.body.id).toEqual(createdSurveyQuestions!.id);
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
