import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class CastErrorFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
