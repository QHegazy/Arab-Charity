import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseEmailPipe implements PipeTransform {
  private readonly emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isValidEmail(value)) {
      throw new BadRequestException('Invalid email format');
    }
    return value;
  }

  private isValidEmail(value: any): boolean {
    return typeof value === 'string' && this.emailRegex.test(value);
  }
}
