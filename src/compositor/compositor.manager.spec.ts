/* eslint-disable @typescript-eslint/naming-convention */
import { CompositorManager } from './compositor.manager';
import {
  ISurveyAnswers,
  ISurveyQuestions,
} from './interfaces/compositor.interface';
import { testsValues } from '../utils/mocks';
import {
  SurveyQuestionsNotFoundError,
  SurveyAnswersNotFoundError,
} from '../utils/errors/compositor';
import QuestionsService from '../utils/services/questions.service';
import AnswersService from '../utils/services/answers.service';

describe('Compositor Manager Module', () => {
  beforeAll(async () => {
  });

  afterEach(async () => {
  });

  afterAll(async () => {
  });

  describe('Delete a survey', () => {
    test('Should delete survey`s questions and answers', async () => {
      const createdSurveyQuestions =
        await QuestionsService.createQuestionSurvey(
          {},
          testsValues.questionsValues.validSurveyName1,
          testsValues.questionsValues.validCreatorId,
          testsValues.questionsValues.validContent1
        );

      const answersSurvey: unknown = testsValues.answersValues.validSurvey;
      (answersSurvey as ISurveyAnswers).surveyId =
        createdSurveyQuestions?.id as string;

      const createdSurveyAnswers = await AnswersService.createAnswersSurvey(
        {},
        answersSurvey as ISurveyAnswers
      );

      if (!createdSurveyQuestions || !createdSurveyAnswers) {
        fail();
      }

      const deletedSurvey = await CompositorManager.deleteSurvey(
        createdSurveyQuestions.id as string
      );
      expect(createdSurveyQuestions.id as string).toEqual(
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
      const createdSurveyQuestions =
        await QuestionsService.createQuestionSurvey(
          {},
          testsValues.questionsValues.validSurveyName1,
          testsValues.questionsValues.validCreatorId,
          testsValues.questionsValues.validContent1
        );

      const answersSurvey: unknown = testsValues.answersValues.validSurvey;
      (answersSurvey as ISurveyAnswers).surveyId =
        createdSurveyQuestions?.id as string;

      const createdSurveyAnswers = await AnswersService.createAnswersSurvey(
        {},
        answersSurvey as ISurveyAnswers
      );

      if (!createdSurveyQuestions || !createdSurveyAnswers) {
        fail();
      }

      const foundSurveyResults = await CompositorManager.getSurveyResults(
        createdSurveyQuestions.id as string
      );
      expect(createdSurveyQuestions.id as string).toEqual(
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
