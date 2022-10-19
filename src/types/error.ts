import { ValidationFailure } from "@types";

export class AppError extends Error {
  public status: string;
  public statusCode: number;
}

// tslint:disable-next-line: max-classes-per-file
export class ValidationError extends AppError {
  public status: string = "DEFAULT_ERRORS.VALIDATION_FAILED";
  public statusCode: number = 400;
  public failures: ValidationFailure[];

  constructor(msg: string, failures: ValidationFailure[]) {
    super(msg);
    this.failures = failures;
  }
}

// tslint:disable-next-line: max-classes-per-file
export class AuthenticationError extends AppError {
  public status: string = "DEFAULT_ERRORS.AUTHENTICATION_FAILED";
  public statusCode: number = 401;

  constructor(msg: string) {
    super(msg);
  }
}

// tslint:disable-next-line: max-classes-per-file
export class NotFoundError extends AppError {
  public status: string = "DEFAULT_ERRORS.RESOURCE_NOT_FOUND";
  public statusCode: number = 404;

  constructor(msg: string) {
    super(msg);
  }
}

// tslint:disable-next-line: max-classes-per-file
export class ServerError extends AppError {
  public status: string = "DEFAULT_ERRORS.INTERNAL_SERVER_ERROR";
  public statusCode: number = 500;

  constructor(msg: string) {
    super(msg);
  }
}
