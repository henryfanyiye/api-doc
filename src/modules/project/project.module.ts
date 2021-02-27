import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entity/project.entity';
import { ProjectCatalog } from './entity/project-catalog.entity';
import { ProjectItem } from './entity/project-item.entity';
import { UserProject } from '../user/entity/user-project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Project,
        ProjectCatalog,
        ProjectItem,
        UserProject,
      ],
      'sqlite'),
  ],
  controllers: [
    ProjectController,
  ],
  providers: [
    ProjectService,
  ],
})
export class ProjectModule {
}
