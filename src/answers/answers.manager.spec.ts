import * as mongoose from 'mongoose';
import { config } from '../config';
import { AnswerManager } from './answers.manager';
import {
  validSurvey,
  validSurveyId,
  validUserId,
  validContent1,
  invalidSurveyId,
} from '../utils/mocks';
import { SurveyNotFound } from '../utils/errors/answer';

const {
  db: { connectionString, dbName },
} = config;

describe('call Manager Module', () => {
  beforeAll(async () => {
    await mongoose.connect(connectionString, { dbName });
    await mongoose.connection.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe('Post a survey', () => {
    test('Should create a survey', async () => {
      const createdSurvey = await AnswerManager.create(validSurvey);
      if (!createdSurvey.surveyId) {
        fail();
      }
      const survey = await AnswerManager.showSurveyById(createdSurvey.surveyId);
      expect(createdSurvey.surveyId).toEqual(survey[0]?.surveyId);
    });
  });

  
  describe('get a survey by id', () => {
    test('Should get a survey', async () => {
      const createdSurvey = await AnswerManager.create({
        surveyId: validSurveyId,
        userId: validUserId,
        content: validContent1,
      });

      if (!createdSurvey.surveyId) {
        fail();
      }

      const survey = await AnswerManager.showSurveyById(createdSurvey.surveyId);
      expect(survey[0]?.surveyId).toBeDefined();
    });

    test('Should throw survey not found error', async () => {
      try {
        await AnswerManager.showSurveyById(invalidSurveyId);
      } catch (err) {
        expect(err).toBeInstanceOf(SurveyNotFound);
      }
    });
  });
});
