/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { ISurveyQuestionsAndAnswers } from '../interfaces/compositor.interface';
import { ISurveyQuestions } from '../interfaces/questions.interface';
import { ISurveyAnswers } from '../interfaces/answers.interface';
import {
  SurveyAnswersNotFound,
  SurveyQuestionsNotFound,
} from '../utils/errors/compositor'; // TODO: check if survey answers and questions interfaces are needed for functions.
import { config } from '../config';

export class CompositorManager {
  static async deleteSurvey(surveyId: string): Promise<ISurvey> {
    // פה אני מחזיר את כל התשובות והשאלות של שאלון מסויים או רק את השאלות?
    // return AnswerRepository.create(newSurvey);
  }

  static async getSurveyResults(
    surveyId: string
  ): Promise<ISurveyQuestionsAndAnswers> {
    const surveyAnswers = (
      await axios.get(
        `${config.answersService.answersCrudConnectionString}/api/answers/find`,
        { params: { surveyId } } // fix path
      )
    ).data;

    const surveyQuestions = (
      await axios.get(
        `${config.questionsService.questionsCrudConnectionString}/api/questions/getSurveyById`,
        { params: { surveyId } } // fix path
      )
    ).data;

    const surveyQuestionsAndAnswers: ISurveyQuestionsAndAnswers = {
      answers: surveyAnswers as ISurveyAnswers,
      questions: surveyQuestions as ISurveyQuestions,
    };

    const error: Error | null = !surveyQuestions
      ? new SurveyQuestionsNotFound()
      : !surveyAnswers
      ? new SurveyAnswersNotFound()
      : null;

    if (error) throw error;

    return surveyQuestionsAndAnswers;
  }
}
