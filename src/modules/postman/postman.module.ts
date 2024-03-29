import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { PostmanController } from './postman.controller';
import { PostmanService } from './postman.service';
import { Project } from '../project/entity/project.entity';
import { ProjectCatalog } from '../project/entity/project-catalog.entity';
import { ProjectItem } from '../project/entity/project-item.entity';
import { User } from '../user/entity/user.entity';
import { UserProject } from '../user/entity/user-project.entity';
import { ProjectService } from '../project/project.service';
import { UserService } from '../user/user.service';


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
        ProjectItem,
        User,
        UserProject,
      ],
      'sqlite'),
  ],
  controllers: [
    PostmanController,
  ],
  providers: [
    PostmanService,
    ProjectService,
    UserService,
  ],
})
export class PostmanModule {
}
