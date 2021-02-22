import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorator/jwt.decorator';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {

    // Whether to skip authentication
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // Get the token from header
    let authHeader: string = null;

    if (context['contextType'] === 'http') authHeader = context.switchToHttp().getRequest().headers.authorization as string;

    if (context['contextType'] === 'graphql') authHeader = context.getArgs()[2].req.headers.authorization as string;

    // Check the token is exist
    if (!authHeader) throw new UnauthorizedException('Authorization header not found.');

    const [type, token] = authHeader.split(' ');

    // Check the token type
    if (type !== 'Bearer') throw new UnauthorizedException(`Authentication type \'Bearer\' required. Found \'${type}\'`);

    // Validate token
    const validationResult = await this.authService.validateToken(token);

    if (validationResult === true) return true;

    throw new UnauthorizedException(validationResult);
  }
}
