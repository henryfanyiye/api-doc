import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserProject } from './entity/user-project.entity';
import { Project } from '../project/entity/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        User,
        UserProject,
        Project,
      ],
      'sqlite',
    ),
  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserService,
  ],
})
export class UserModule {
}
