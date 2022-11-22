/* eslint-disable @typescript-eslint/no-unused-vars */
import { ISurveyQuestionsAndAnswers } from './interfaces/compositor.interface';
import {
  ISurveyQuestions,
  ISurveyAnswers,
} from './interfaces/compositor.interface';
import {
  SurveyAnswersNotFoundError,
  SurveyQuestionsNotFoundError,
} from '../utils/errors/compositor';
import AnswersService from '../utils/services/answers.service';
import QuestionsService from '../utils/services/questions.service';

export class CompositorManager {
  static async deleteSurvey(
    surveyId: string
  ): Promise<ISurveyQuestions | null> {
    const survey = await QuestionsService.deleteQuestion({}, surveyId);

    if (!survey) new SurveyQuestionsNotFoundError();

    await AnswersService.deleteAnswer({}, surveyId);

    if (!survey) throw new Error('error'); // TODO: change to real error!!!
    return survey;
  }

  static async getSurveyResults(
    surveyId: string
  ): Promise<ISurveyQuestionsAndAnswers> {
    const surveyAnswers = await AnswersService.getAnswer({}, surveyId); // TODO: CHECK IF surveyAnswers ISNT NULL (IF AWAIT WORKED)
    const surveyQuestions = await QuestionsService.getQuestion({}, surveyId);

    const error: Error | null = !surveyQuestions
      ? new SurveyQuestionsNotFoundError()
      : !surveyAnswers
      ? new SurveyAnswersNotFoundError()
      : null;

    if (error) throw error;

    const surveyQuestionsAndAnswers: ISurveyQuestionsAndAnswers = {
      answers: surveyAnswers as ISurveyAnswers,
      questions: surveyQuestions as ISurveyQuestions,
    };

    return surveyQuestionsAndAnswers;
  }
}
