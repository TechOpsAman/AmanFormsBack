export interface Survey { 
  id?: string;
  creatorId: string; //add in joi and stuff
  surveyName: string;
  required: boolean;
  content: Array<Question>;
}

export interface Question {
  id?: string;
  questionName: string;
  questionType: QuestionType;
  answers?: Array<Answer>;
}
export interface Answer {
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


