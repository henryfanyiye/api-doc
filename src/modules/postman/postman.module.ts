import { Module } from '@nestjs/common';
import { PostmanController } from './postman.controller';
import { PostmanService } from './postman.service';
import { PostmanResolver } from './postman.resolver';

@Module({
  controllers: [PostmanController],
  providers: [PostmanService, PostmanResolver]
})
export class PostmanModule {}
