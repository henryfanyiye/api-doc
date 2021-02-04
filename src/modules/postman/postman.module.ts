import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostmanController } from './postman.controller';
import { PostmanService } from './postman.service';
import { PostmanResolver } from './postman.resolver';
import { Postman } from './postman.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Postman])],
  controllers: [PostmanController],
  providers: [PostmanService, PostmanResolver],
})
export class PostmanModule {
}
