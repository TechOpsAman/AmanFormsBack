export interface ISurvey {
  surveyId: string;
  userId: string;
  content: Array<ISection>;
}

export interface ISection {
  questionName: string;
  questionType: string;
  required: boolean;
  answers: Array<string>;
}