import { AnswerError } from './errors';

export class SurveyNotFound extends AnswerError {
  constructor() {
    super('Survey not found', 404);
  }
}

export class ValidationError extends AnswerError {
  constructor() {
    super('Validation error', 400);
  }
}
