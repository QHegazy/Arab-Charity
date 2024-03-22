import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Error } from 'mongoose';

@Catch()
export class CastErrorExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      error = exception.name;
    } else if (exception instanceof Error.CastError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Please provide a valid ID';
      error = 'Invalid ID';
    }

    response.status(status).json({
      status: 'error',
      code: status,
      message,
      error,
      timestamp: new Date().toISOString(),
    });
  }
}
