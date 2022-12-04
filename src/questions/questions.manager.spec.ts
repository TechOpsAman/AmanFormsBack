import * as mongoose from 'mongoose';
import { config } from '../config';
/* eslint-disable @typescript-eslint/naming-convention */
import { QuestionManager } from './questions.manager';
import {
  validSurveyName1,
  validSurveyName2,
  validCreatorId,
  validContent1,
  validContent2,
  invalidSurveyId,
  invalidQuestionId,
  validrequired,
  valueSurveyDescription,
} from '../utils/mocks';
import { Question } from './questions.interface';
import {
  QuestionNotFoundError,
  SurveyNotFoundError,
} from '../utils/errors/questions';

const {
  db: { connectionString, dbName },
} = config;

describe('Questions Manager Module', () => {
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
      const createdSurvey = await QuestionManager.createSurvey(
        validSurveyName1,
        valueSurveyDescription,
        validCreatorId,
        validrequired,
        validContent1 as Question[],
      );
      if (!createdSurvey.id) {
        fail();
      }
      const survey = await QuestionManager.getSurveyById(createdSurvey.id);
      expect(createdSurvey.id).toEqual(survey?.id);
    });
  });

  describe('Update a survey', () => {
    test('Should Update a survey', async () => {
      const createdSurvey = await QuestionManager.createSurvey(
        validSurveyName1,
        valueSurveyDescription,
        validCreatorId,
        validrequired,
        validContent1 as Question[],
      );

      if (!createdSurvey.id) {
        fail();
      }

      const updatedSurvey = await QuestionManager.updateSurvey(
        createdSurvey.id,
        valueSurveyDescription,
        validSurveyName2,
        validrequired,
        validContent2 as Question[],
      );
      const survey = await QuestionManager.getSurveyById(createdSurvey.id);

      expect(updatedSurvey?.id).toEqual(survey?.id);
      expect(updatedSurvey?.surveyName).toEqual(survey?.surveyName);
    });

    test('Should Update a survey without a name', async () => {
      const createdSurvey = await QuestionManager.createSurvey(
        validSurveyName1,
        valueSurveyDescription,
        validCreatorId,
        validrequired,
        validContent1 as Question[],
      );

      if (!createdSurvey.id) {
        fail();
      }

      const updatedSurvey = await QuestionManager.updateSurvey(
        createdSurvey.id,
        valueSurveyDescription,
        '',
        validrequired,
        validContent2 as Question[],
      );
      const survey = await QuestionManager.getSurveyById(createdSurvey.id);
      expect(updatedSurvey?.id).toEqual(survey?.id);
      expect(createdSurvey?.surveyName).toEqual(survey?.surveyName);
    });

    test('Should throw survey not found error', async () => {
      const createdSurvey = await QuestionManager.createSurvey(
        validSurveyName1,
        valueSurveyDescription,
        validCreatorId,
        validrequired,
        validContent1 as Question[],
      );

      if (!createdSurvey.id) {
        fail();
      }
      try {
        await QuestionManager.updateSurvey(
          invalidSurveyId,
          valueSurveyDescription,
          '',
          validrequired,
          validContent2 as Question[],
        );
      } catch (err) {
        expect(err).toBeInstanceOf(SurveyNotFoundError);
      }
    });
  });

  describe('get a survey by id', () => {
    test('Should get a survey', async () => {
      const createdSurvey = await QuestionManager.createSurvey(
        validSurveyName1,
        valueSurveyDescription,
        validCreatorId,
        validrequired,
        validContent1 as Question[],
      );

      if (!createdSurvey.id) {
        fail();
      }

      const survey = await QuestionManager.getSurveyById(createdSurvey.id);
      expect(createdSurvey.id).toEqual(survey?.id);
    });

    test('Should throw survey not found error', async () => {
      try {
        await QuestionManager.getSurveyById(invalidSurveyId);
      } catch (err) {
        expect(err).toBeInstanceOf(SurveyNotFoundError);
      }
    });
  });

  describe('delete a survey by id', () => {
    test('Should delete a survey', async () => {
      const createdSurvey = await QuestionManager.createSurvey(
        validSurveyName1,
        valueSurveyDescription,
        validCreatorId,
        validrequired,
        validContent1 as Question[],
      );

      if (!createdSurvey.id) {
        fail();
      }

      const survey = await QuestionManager.deleteSurveyById(createdSurvey.id);
      expect(createdSurvey.id).toEqual(survey?.id);
    });

    test('Should throw survey not found error', async () => {
      try {
        await QuestionManager.deleteSurveyById(invalidSurveyId);
      } catch (err) {
        expect(err).toBeInstanceOf(SurveyNotFoundError);
      }
    });
  });

  describe('Get a question', () => {
    test('Should get a question', async () => {
      const createdSurvey = await QuestionManager.createSurvey(
        validSurveyName1,
        valueSurveyDescription,
        validCreatorId,
        validrequired,
        validContent1 as Question[],
      );

      if (!createdSurvey.id) {
        fail();
      }

      const question = await QuestionManager.getQuestion(
        createdSurvey.id,
        createdSurvey.content[0].id as string,
      );
      expect(createdSurvey.content[0].id).toEqual(question?.id);
    });

    test('Should throw survey not found error', async () => {
      const createdSurvey = await QuestionManager.createSurvey(
        validSurveyName1,
        valueSurveyDescription,
        validCreatorId,
        validrequired,
        validContent1 as Question[],
      );

      if (!createdSurvey.id) {
        fail();
      }

      try {
        await QuestionManager.getQuestion(
          invalidSurveyId,
          createdSurvey.content[0].id as string,
        );
      } catch (err) {
        expect(err).toBeInstanceOf(SurveyNotFoundError);
      }
    });

    test('Should throw question not found error', async () => {
      const createdSurvey = await QuestionManager.createSurvey(
        validSurveyName1,
        valueSurveyDescription,
        validCreatorId,
        validrequired,
        validContent1 as Question[],
      );

      if (!createdSurvey.id) {
        fail();
      }

      try {
        await QuestionManager.getQuestion(createdSurvey.id, invalidQuestionId);
      } catch (err) {
        expect(err).toBeInstanceOf(QuestionNotFoundError);
      }
    });
  });

  describe('delete a question', () => {
    test('Should delete a question', async () => {
      const createdSurvey = await QuestionManager.createSurvey(
        validSurveyName1,
        valueSurveyDescription,
        validCreatorId,
        validrequired,
        validContent1 as Question[],
      );

      if (!createdSurvey.id) {
        fail();
      }

      const question = await QuestionManager.deleteQuestion(
        createdSurvey.id,
        createdSurvey.content[0].id as string,
      );
      expect(createdSurvey.content[0].id).not.toEqual(question?.id);
    });

    test('Should throw survey not found error', async () => {
      const createdSurvey = await QuestionManager.createSurvey(
        validSurveyName1,
        valueSurveyDescription,
        validCreatorId,
        validrequired,
        validContent1 as Question[],
      );

      if (!createdSurvey.id) {
        fail();
      }

      try {
        await QuestionManager.deleteQuestion(
          invalidSurveyId,
          createdSurvey.content[0].id as string,
        );
      } catch (err) {
        expect(err).toBeInstanceOf(SurveyNotFoundError);
      }
    });

    test('Should throw question not found error', async () => {
      const createdSurvey = await QuestionManager.createSurvey(
        validSurveyName1,
        valueSurveyDescription,
        validCreatorId,
        validrequired,
        validContent1 as Question[],
      );

      if (!createdSurvey.id) {
        fail();
      }

      try {
        await QuestionManager.deleteQuestion(
          createdSurvey.id,
          invalidQuestionId,
        );
      } catch (err) {
        expect(err).toBeInstanceOf(QuestionNotFoundError);
      }
    });
  });

  describe('update a question', () => {
    test('Should delete a question', async () => {
      const createdSurvey = await QuestionManager.createSurvey(
        validSurveyName1,
        valueSurveyDescription,
        validCreatorId,
        validrequired,
        validContent1 as Question[],
      );

      if (!createdSurvey.id) {
        fail();
      }

      const question = await QuestionManager.updateQuestion(
        createdSurvey.id,
        createdSurvey.content[0].id as string,
        validContent2 as Question[],
      );

      expect(createdSurvey.content[0].id).not.toEqual(question?.id);
    });

    test('Should throw survey not found error', async () => {
      const createdSurvey = await QuestionManager.createSurvey(
        validSurveyName1,
        valueSurveyDescription,
        validCreatorId,
        validrequired,
        validContent1 as Question[],
      );

      if (!createdSurvey.id) {
        fail();
      }

      try {
        await QuestionManager.updateQuestion(
          invalidSurveyId,
          createdSurvey.content[0].id as string,
          validContent2 as Question[],
        );
      } catch (err) {
        expect(err).toBeInstanceOf(SurveyNotFoundError);
      }
    });

    test('Should throw question not found error', async () => {
      const createdSurvey = await QuestionManager.createSurvey(
        validSurveyName1,
        valueSurveyDescription,
        validCreatorId,
        validrequired,
        validContent1 as Question[],
      );

      if (!createdSurvey.id) {
        fail();
      }

      try {
        await QuestionManager.updateQuestion(
          createdSurvey.id,
          invalidQuestionId,
          validContent2 as Question[],
        );
      } catch (err) {
        expect(err).toBeInstanceOf(QuestionNotFoundError);
      }
    });
  });
});
