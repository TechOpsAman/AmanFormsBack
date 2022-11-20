import { ISurveyQuestions } from './questions.interface';
import { ISurveyAnswers } from './answers.interface';

export interface ISurveyQuestionsAndAnswers {
  answers: ISurveyAnswers;
  questions: ISurveyQuestions;
}
