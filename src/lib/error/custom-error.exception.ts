import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorOptions } from './options.interface';

export class CustomErrorException extends HttpException {
  constructor(options: ErrorOptions) {
    const { status, code, message } = options;
    super({ code, message }, status || HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
