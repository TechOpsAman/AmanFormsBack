export interface ISurvey {
  surveyId: string;
  userId: string;
  content: Array<ISection>;
}

export interface ISection {
  questionId: string;
  required: boolean;
  answers: Array<string>;
}