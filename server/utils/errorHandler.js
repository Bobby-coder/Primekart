// Generic error class to generate error object with specified message & statusCode
class ErrorHandler extends Error {
  statusCode;

  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
