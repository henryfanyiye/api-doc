import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { PostmanController } from './postman.controller';
import { PostmanService } from './postman.service';
import { Project } from './entity/project.entity';
import { ProjectCatalog } from './entity/project-catalog.entity';


@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        //自定义路径
        destination: `./fileUpload/`,
        filename: (req, file, cb) => {
          return cb(null, file.originalname);
        },
      }),
    }),
    TypeOrmModule.forFeature(
      [
        Project,
        ProjectCatalog,
      ],
      'sqlite'),
  ],
  controllers: [PostmanController],
  providers: [
    PostmanService,
  ],
})
export class PostmanModule {
}
