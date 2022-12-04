import { QuestionError } from './errors';

export class ValidationError extends QuestionError {
  /* istanbul ignore next */
  constructor() {
    super('Validation error', 400);
  }
}

export class SurveyNotFoundError extends QuestionError {
  /* istanbul ignore next */
  constructor(message = 'survey not found') {
    super(message, 404);
  }
}
/* istanbul ignore next */
export class QuestionNotFoundError extends QuestionError {
  constructor() {
    super('question not found', 404);
  }
}