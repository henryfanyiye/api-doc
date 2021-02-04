import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { LoggerMiddleware } from './middleware/logging.middleware';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ErrorFilter } from './filter/error.filter';

import { PostmanModule } from './modules/postman/postman.module';
import { Postman } from './modules/postman/postman.entity';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    // 注册config
    ConfigModule.forRoot({
      ignoreEnvFile: true, // 禁用ENV变量加载
      isGlobal: true, // 使用全局模块
      cache: true, // 缓存环境变量
      // load: switchConfig()
    }),
    // 注册Graph
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    // Database
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      database: 'api-doc',
      entities: [Postman],
      synchronize: true,
    }),
    // Modules
    PostmanModule,
    FileModule,
  ],
  providers: [
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
