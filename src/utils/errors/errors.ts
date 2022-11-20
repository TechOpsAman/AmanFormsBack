import * as jayson from 'jayson/promise';

export class ApplicationError extends Error implements jayson.JSONRPCError {
  public code: number;

  constructor(public message: string, public status: number) {
    super();
    this.code = this.status;
    this.name = this.constructor.name;
  }
}

export class ServiceError extends ApplicationError {
  constructor(message = 'Service Error', status = 400) {
    super(message, status);
  }
}

export class ServerError extends ApplicationError {
  constructor(message = 'Server Error', status = 500) {
    super(message, status);
  }
}
