import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entity/team.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Team,
      ],
      'sqlite',
    ),
  ],
  controllers: [
    TeamController,
  ],
  providers: [
    TeamService,
  ],
})
export class TeamModule {
}
