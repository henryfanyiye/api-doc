import { Module } from '@nestjs/common';
import { EnvironmentController } from './environment.controller';
import { EnvironmentService } from './environment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Environment } from './entity/environment.entity';
import { UserEnvironment } from '../user/entity/user-environment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        UserEnvironment,
        Environment
      ],
      'sqlite'
    )
  ],
  controllers: [
    EnvironmentController
  ],
  providers: [
    EnvironmentService
  ]
})
export class EnvironmentModule {
}
