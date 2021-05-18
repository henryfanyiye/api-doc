import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from './config';

import { LoggerMiddleware } from './middleware/logging.middleware';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ErrorFilter } from './filter/error.filter';

import { PostmanModule } from './modules/postman/postman.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/guard/auth.guard';
import { ProjectModule } from './modules/project/project.module';
import { TeamModule } from './modules/team/team.module';
import { RedisModule } from '@svtslv/nestjs-ioredis';
import { EnvironmentModule } from './modules/environment/environment.module';

@Module({
  imports: [
    // 注册config
    ConfigModule.forRoot({
      isGlobal: true, // 使用全局模块
      cache: true, // 缓存环境变量
      load: [config],
    }),
    // Redis
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('ioredis'),
      inject: [ConfigService],
    }),
    // SQLite
    TypeOrmModule.forRootAsync({
      name: 'sqlite',
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('sqlite'),
      inject: [ConfigService],
    }),
    // Modules
    AuthModule,
    PostmanModule,
    UserModule,
    ProjectModule,
    TeamModule,
    EnvironmentModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // Response格式化
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    // error filter
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
