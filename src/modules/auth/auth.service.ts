import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRedis, Redis } from '@svtslv/nestjs-ioredis';
import { hash } from 'typeorm/util/StringUtils';

@Injectable()
export class AuthService {
  constructor(
    // private readonly jwtService: JwtService,
    private readonly configServer: ConfigService,
    @InjectRedis() private readonly redis: Redis,
  ) {
  }

  async validate(token: string): Promise<any> {
    const user = await this.redis.get(token);
    if (!user) {
      throw new UnauthorizedException();
    }
    return JSON.parse(user);
  }

  async generateToken(payload: any) {
    const { member_id } = payload;
    const { tokenKey, expiresIn } = this.configServer.get('auth');

    const userKey = `${tokenKey}${member_id}`;

    payload = JSON.stringify(payload);
    const accessToken = hash(payload + new Date().getTime() + Math.round(Math.random() * 100));

    const token = await this.redis.get(userKey);
    if (token) await this.redis.pexpire(token, Math.round(Math.random() * 100));

    const multi = await this.redis.multi();
    multi.set(userKey, accessToken, 'EX', expiresIn);
    multi.set(accessToken, payload, 'EX', expiresIn);
    multi.exec();

    return { accessToken, expiresIn };
  }
}
