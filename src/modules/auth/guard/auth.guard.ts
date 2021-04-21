import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IS_PUBLIC_KEY } from '../decorator/auth.decorator';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    let token = request.headers.authorization;
    if (!token) {
      throw new UnauthorizedException();
    }
    token = token.replace('Bearer ', '');
    const user = await this.authService.validate(token);

    context.switchToHttp().getRequest()['user'] = user;
    return context;
  }
}
