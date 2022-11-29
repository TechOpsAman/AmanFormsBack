import * as jayson from 'jayson/promise';

export class ApplicationError extends Error implements jayson.JSONRPCError {
  public code: number;

  constructor(public message: string, public status: number) {
    super();
    this.code = this.status;
    this.name = this.constructor.name;
  }
}

export class AnswerError extends ApplicationError {
  constructor(message = 'Answer Error', status = 400) {
    super(message, status);
  }
}

export class QuestionError extends ApplicationError {
  constructor(message = 'Quesion Error', status = 400) {
    super(message, status);
  }
}