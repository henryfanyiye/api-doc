import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import config from './config';

import { LoggerMiddleware } from './middleware/logging.middleware';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ErrorFilter } from './filter/error.filter';

import { PostmanModule } from './modules/postman/postman.module';
import { FileModule } from './modules/file/file.module';
import { UserModule } from './modules/user/user.module';
import { RedisModule } from '@svtslv/nestjs-ioredis';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guard/jwt-auth.guard';

@Module({
  imports: [
    // 注册config
    ConfigModule.forRoot({
      isGlobal: true, // 使用全局模块
      cache: true, // 缓存环境变量
      load: [config],
    }),
    // 注册Graph
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
    }),
    // Database
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('redis'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 数据库配置项依赖于ConfigModule，需在此引入
      useFactory: (config: ConfigService) => config.get('mongodb'),
      inject: [ConfigService], // 记得注入服务，不然useFactory函数中获取不到ConfigService
    }),
    // Modules
    AuthModule,
    FileModule,
    PostmanModule,
    UserModule,
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
