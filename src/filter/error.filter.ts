import { Catch, HttpException, Logger } from '@nestjs/common';

@Catch(HttpException)
export class ErrorFilter {
  catch(exception, host) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    const { method, originalUrl } = request;

    const code = exception['response'] && exception['response'].code ? exception['response'].code : status;

    const message = exception['response'] && exception['response'].message ? exception['response'].message : exception['message'];

    const data = {
      action: 'After',
      method,
      originalUrl,
      message,
    };

    Logger.error(JSON.stringify(data));

    response.status(status).json({
      code: code,
      msg: message,
    });
  }
}
