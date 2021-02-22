import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostmanController } from './postman.controller';
import { PostmanService } from './postman.service';
import { PostmanResolver } from './postman.resolver';
import { Postman } from './entity/postman.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Postman], 'mongodb')],
  controllers: [PostmanController],
  providers: [PostmanService, PostmanResolver],
})
export class PostmanModule {
}
