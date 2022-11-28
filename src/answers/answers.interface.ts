export interface ISurvey {
  surveyId: string;
  userId: string;
  required: boolean;
  content: Array<ISection>;
}

export interface ISection {
  questionId: string;
  answers: Array<string>;
}