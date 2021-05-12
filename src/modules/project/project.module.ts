import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from './entity/project.entity';
import { ProjectCatalog } from './entity/project-catalog.entity';
import { ProjectItem } from './entity/project-item.entity';
import { User } from '../user/entity/user.entity';
import { UserProject } from '../user/entity/user-project.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [
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
    ProjectController,
  ],
  providers: [
    ProjectService,
    UserService,
  ],
})
export class ProjectModule {
}
