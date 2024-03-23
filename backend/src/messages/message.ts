export class ResponseObject<T> {
  status: string;
  code: number;
  message: string;
  data?: T;

  constructor(status: string, code: number, message: string, data?: T) {
    this.status = status;
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
