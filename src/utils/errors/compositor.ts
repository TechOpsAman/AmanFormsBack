import { AnswerError, QuestionError } from './errors';

export class SurveyAnswersNotFound extends AnswerError {
  constructor() {
    super('Survey answers not found', 404);
  }
}

export class SurveyQuestionsNotFound extends QuestionError {
  constructor() {
    super('Survey questions not found', 404);
  }
}
