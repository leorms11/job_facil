export class AppError extends Error {
  httpStatusCode?: number;
  body?: any;

  constructor(message: string, statusCode?: number, body?: any) {
    super(message);
    this.name = "AppError";
    this.httpStatusCode = statusCode;
    this.body = body;
  }
}
