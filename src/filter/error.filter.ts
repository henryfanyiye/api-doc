import { Catch, HttpException, Logger } from '@nestjs/common';

@Catch(HttpException)
export class ErrorFilter {
  catch(exception, host) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    const { method, originalUrl } = request;
    const message =
      exception['message'] ||
      exception['response'].message ||
      exception['response'].data.message;

    const data = {
      action: 'After',
      method,
      originalUrl,
      message,
      error: exception['response'].message || exception['message'],
    };

    Logger.error(JSON.stringify(data));

    response.status(status).json({
      code: status,
      msg: message,
    });
  }
}
