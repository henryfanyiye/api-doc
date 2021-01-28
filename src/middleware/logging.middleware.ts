import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        const { method, originalUrl, headers, body } = req
        const beforeData = {
            action: 'Before',
            method,
            originalUrl,
            headers,
            body
        }
        Logger.log(JSON.stringify(beforeData));
        next();
    }
}
