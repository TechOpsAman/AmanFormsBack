// Question
export interface ISurveyQuestions {
  id?: string;
  creatorId: string; //add in joi and stuff
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
