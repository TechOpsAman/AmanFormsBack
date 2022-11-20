import { ISurveyQuestions } from './questions.interface';
import { ISurveyAnswers } from './answers.interface';

// ask daniel if ok!
export interface ISurveyQuestionsAndAnswers {
  answers: ISurveyAnswers;
  questions: ISurveyQuestions;
}
