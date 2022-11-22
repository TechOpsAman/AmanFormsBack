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
  // TODO: change type in order
  // to get only info in ONE OBJECT without duplicated fields (survey id
  // and content (in content it's not the same information so the key field
  // name needs to be different (for example:
  // questionsSurveyContent and answersSurveyContent)))!!!
  answers: ISurveyAnswers;
  questions: ISurveyQuestions;
}

// check
