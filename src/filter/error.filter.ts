// import {
//     ExceptionFilter,
//     Catch,
//     ArgumentsHost,
//     HttpException,
//     Logger
// } from '@nestjs/common';
//
// @Catch()
// export class ErrorFilter implements ExceptionFilter {
//     catch(exception: HttpException, host: ArgumentsHost) {
//         const request = host.switchToHttp().getRequest();
//         const response = host.switchToHttp().getResponse();
//
//         const {method, originalUrl} = request;
//         const message = exception['message'] || exception['response'].message || exception['response'].data.message;
//
//         const data = {
//             action: 'After',
//             method,
//             originalUrl,
//             message,
//             data: null,
//         };
//
//         Logger.log(JSON.stringify(data));
//
//         response.status(400).jsonp({
//             code: 400,
//             msg: 'Failed',
//             data: exception
//         });
//     }
// }

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
      data: null,
    };

    Logger.error(JSON.stringify(data));

    response.status(status).json({
      code: status,
      msg: message,
    });
  }
}
