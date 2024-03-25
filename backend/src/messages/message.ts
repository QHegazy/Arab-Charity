export class ResponseObject<T> {
  status: string;
  statusCode: number;
  message: string;
  data?: T;

  constructor(status: string, code: number, message: string, data?: T) {
    this.status = status;
    this.statusCode = code;
    this.message = message;
    this.data = data;
  }
}
