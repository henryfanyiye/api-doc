import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, headers, body } = req;
    const beforeData = {
      action: 'Before',
      method,
      originalUrl,
      headers,
      body,
    };
    Logger.log(JSON.stringify(beforeData));
    next();
  }
}
