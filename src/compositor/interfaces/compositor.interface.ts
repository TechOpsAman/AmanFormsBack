export interface ISurveyAnswers {
  surveyId: string;
  userId: string;
  content: Array<ISection>;
}

export interface ISection {
  questionId: string;
  answers: Array<string>;
}

export interface ISurveyQuestions {
  id?: string;
  creatorId: string;
  surveyName: string;
  content: Array<IQuestion>;
}

export interface IQuestion {
  id?: string;
  questionName: string;
  questionType: QuestionType;
  answers?: Array<IAnswer>;
}

export interface IAnswer {
  id?: string;
  answer: string;
}

export enum QuestionType {
  shortAnswer = 'shortAnswer',
  longAnswer = 'longAnswer',
  radio = 'radio',
  checkbox = 'checkbox',
  select = 'select',
  title = 'title',
}

export interface ISurveyQuestionsAndAnswers {
  answers: ISurveyAnswers;
  questions: ISurveyQuestions;
}
