/* eslint-disable @typescript-eslint/no-unused-vars */
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
    const survey = await QuestionsService.deleteQuestionSurvey({}, surveyId);

    if (!survey) new SurveyQuestionsNotFoundError();

    await AnswersService.deleteAnswer({}, surveyId);

    if (!survey) throw new Error('error'); // TODO: change to real error!!!
    return survey;
  }

  static async getSurveyResults(
    surveyId: string
  ): Promise<(ISurveyQuestions | ISurveyAnswers)[]> {
    const surveyAnswers = await AnswersService.getAnswer({}, surveyId); // TODO: CHECK IF surveyAnswers ISNT NULL (IF AWAIT WORKED)
    const surveyQuestions = await QuestionsService.getQuestionSurvey(
      {},
      surveyId
    );

    if (!surveyQuestions) throw new SurveyAnswersNotFoundError();
    if (!surveyAnswers) throw new SurveyAnswersNotFoundError();

    return [surveyQuestions, surveyAnswers];
  }
}
