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
import { JwtAuthGuard } from './modules/auth/guard/jwt-auth.guard';
import { ProjectModule } from './modules/project/project.module';

@Module({
  imports: [
    // 注册config
    ConfigModule.forRoot({
      isGlobal: true, // 使用全局模块
      cache: true, // 缓存环境变量
      load: [config],
    }),
    // Database
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
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
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
