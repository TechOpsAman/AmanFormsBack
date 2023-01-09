export interface Survey { 
  id?: string;
  creatorId: string;
  surveyName: string;
  surveyDescription: string;
  content: Array<Question>;
  annonimous: boolean;
  repliers: Array<string>;
}

export interface Question {
  id?: string;
  questionName: string;
  questionType: QuestionType;
  required: boolean;
  answers?: Array<Answer>;
}
export interface Answer {
  id?: string;
  answer: string;
}

export enum QuestionType {
  shortAnswer = "SHORT_ANSWER",
  longAnswer = "LONG_ANSWER",
  radio = "RADIO",
  checkbox = "CHECKBOX",
  select = "SELECT",
  title = "TITLE",
}


