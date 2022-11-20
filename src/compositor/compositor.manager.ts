/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { ISurveyQuestionsAndAnswers } from '../interfaces/compositor.interface';
import { ISurveyQuestions } from '../interfaces/questions.interface';
import { ISurveyAnswers } from '../interfaces/answers.interface';
import {
  SurveyAnswersNotFoundError,
  SurveyQuestionsNotFoundError,
} from '../utils/errors/compositor'; // TODO: check if survey answers and questions interfaces are needed for functions.
import { config } from '../config';

export class CompositorManager {
  static async deleteSurvey(surveyId: string): Promise<ISurveyQuestions> {
    const survey: ISurveyQuestions | null | undefined = await axios.delete(
      `${config.questionsService.questionsCrudConnectionString}/api/questions/deleteSurveyById`,
      { params: { surveyId } }
    );

    if (!survey) new SurveyQuestionsNotFoundError();

    await axios.delete(
      `${config.answersService.answersCrudConnectionString}/api/answers/deleteSurveyById`,
      { params: { surveyId } }
    );

    return survey as ISurveyQuestions;
  }

  static async getSurveyResults(
    surveyId: string
  ): Promise<ISurveyQuestionsAndAnswers> {
    const surveyAnswers = (
      await axios.get(
        `${config.answersService.answersCrudConnectionString}/api/answers/find`,
        { params: { surveyId } }
      )
    ).data;

    const surveyQuestions = (
      await axios.get(
        `${config.questionsService.questionsCrudConnectionString}/api/questions/getSurveyById`,
        { params: { surveyId } }
      )
    ).data;

    const surveyQuestionsAndAnswers: ISurveyQuestionsAndAnswers = {
      answers: surveyAnswers as ISurveyAnswers,
      questions: surveyQuestions as ISurveyQuestions,
    };

    const error: Error | null = !surveyQuestions
      ? new SurveyQuestionsNotFoundError()
      : !surveyAnswers
      ? new SurveyAnswersNotFoundError()
      : null;

    if (error) throw error;

    return surveyQuestionsAndAnswers;
  }
}
