import * as mongoose from 'mongoose';
import axios from 'axios';
import { config } from '../config';
/* eslint-disable @typescript-eslint/naming-convention */
import { CompositorManager } from './compositor.manager';
import {
  ISurveyAnswers,
  ISurveyQuestions,
  IQuestion,
  ISection,
} from './interfaces/compositor.interface';
import { testsValues } from '../utils/mocks';
import {
  SurveyQuestionsNotFoundError,
  SurveyAnswersNotFoundError,
} from '../utils/errors/compositor';
import CompositorService from '../utils/services/compositor.service';

const {
  db: { connectionString, dbName },
} = config;

describe('Compositor Manager Module', () => {
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

  describe('Delete a survey', () => {
    test('Should delete survey`s questions and answers', async () => {
      // const createdSurvey = await CompositorService.createSurvey(
      //   {},
      //   testsValues.questionsValues.validSurveyName1,
      //   testsValues.questionsValues.validCreatorId,
      //   testsValues.questionsValues.validContent1 as IQuestion[],
      //   {
      //     answersContent: testsValues.answersValues.validSurvey
      //       .content as Array<ISection>,
      //     userId: testsValues.answersValues.validSurvey.userId as string,
      //   } as Omit<ISurveyAnswers, 'surveyId'>
      // );

      if (!createdSurvey) {
        fail();
      }

      const deletedSurvey = await CompositorManager.deleteSurvey(
        (createdSurvey[0] as ISurveyQuestions).id!
      );
      expect((createdSurvey[0] as ISurveyQuestions).id).toEqual(
        (deletedSurvey[0] as ISurveyQuestions).id
      );
    });

    test('Should throw survey questions not found or survey answers not found error', async () => {
      try {
        await CompositorManager.deleteSurvey(
          testsValues.questionsValues.invalidSurveyId
        );
      } catch (err) {
        expect(err).toBeInstanceOf(
          SurveyQuestionsNotFoundError || SurveyAnswersNotFoundError
        );
      }
    });
  });

  describe('Get survey results', () => {
    test('Should get survey`s questions and answers', async () => {
      // const createdSurvey = await CompositorService.createSurvey(
      //   {},
      //   testsValues.questionsValues.validSurveyName1,
      //   testsValues.questionsValues.validCreatorId,
      //   testsValues.questionsValues.validContent1 as IQuestion[],
      //   {
      //     answersContent: testsValues.answersValues.validSurvey
      //       .content as Array<ISection>,
      //     userId: testsValues.answersValues.validSurvey.userId as string,
      //   } as Omit<ISurveyAnswers, 'surveyId'>
      // );

      if (!createdSurvey) {
        fail();
      }

      const foundSurveyResults = await CompositorManager.getSurveyResults(
        (createdSurvey[0] as ISurveyQuestions).id!
      );
      expect((createdSurvey[0] as ISurveyQuestions).id).toEqual(
        (foundSurveyResults[0] as ISurveyQuestions).id
      );
    });

    test('Should throw survey questions not found or survey answers not found error', async () => {
      try {
        await CompositorManager.getSurveyResults(
          testsValues.questionsValues.invalidSurveyId
        );
      } catch (err) {
        expect(err).toBeInstanceOf(
          SurveyQuestionsNotFoundError || SurveyAnswersNotFoundError
        );
      }
    });
  });
});
