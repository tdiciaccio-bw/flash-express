export class AuthenticationError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class DataValidationError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, DataValidationError.prototype);
  }
}
