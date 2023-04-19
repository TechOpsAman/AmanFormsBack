import { AnswerError, QuestionError } from './errors';

export class ValidationError extends QuestionError {
  /* istanbul ignore next */
  constructor() {
    super('Validation error', 400);
  }
}

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
