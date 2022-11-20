export interface ISurveyAnswers {
  surveyId: string;
  userId: string;
  content: Array<ISection>;
}

export interface ISection {
  questionId: string;
  answers: Array<string>;
}
