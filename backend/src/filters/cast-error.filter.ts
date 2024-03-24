import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Error } from 'mongoose';

@Catch(Error)
export class CastErrorExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal Server Error';
    let error = 'Internal Server Error';

    if (exception instanceof Error.CastError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Please provide a valid ID';
      error = 'Invalid ID';
    } else if (exception.message.includes('Duplicate entry')) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
      error = 'Duplicate entry';
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message;
      error = 'Internal Server Error';
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
