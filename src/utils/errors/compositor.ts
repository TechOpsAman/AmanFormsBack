import { AnswerError, QuestionError } from './errors';

export class SurveyAnswersNotFoundError extends AnswerError {
  constructor() {
    super('Survey answers not found', 404);
  }
}

export class SurveyQuestionsNotFoundError extends QuestionError {
  constructor() {
    super('Survey questions not found', 404);
  }
}
