import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configServer: ConfigService,
  ) {
  }

  async generateToken(payload: any) {
    const accessToken = await this.jwtService.sign(payload);
    return {
      expiresIn: this.configServer.get('jwt').signOptions.expiresIn,
      accessToken,
    };
  }
}
