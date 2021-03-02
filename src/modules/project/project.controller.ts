import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { User } from '../auth/decorator/user.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectCatalogDto } from './dto/create-project-catalog.dto';
import { CreateProjectItemDto } from './dto/create-project-item.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {

  constructor(
    private readonly projectService: ProjectService,
  ) {
  }

  @Post('project/add')
  async createProject(
    @User() user: any,
    @Body() input: CreateProjectDto,
  ) {
    const { uid } = user;
    const pid = await this.projectService.createProject(uid, input);
    return { pid };
  }

  @Get('project/:id')
  async queryProject(
    @Param('id') id: string,
  ) {
    return await this.projectService.queryProject(Number(id));
  }

  @Post('project/update/:id')
  async updateProject(
    @Param('id') id: string,
    @Body() input: CreateProjectDto,
  ) {
    return await this.projectService.updateProject(Number(id), input);
  }

  @Post('catalog/add')
  async createCatalog(
    @Body() input: CreateProjectCatalogDto,
  ) {
    return await this.projectService.createCatalog(input);
  }

  @Post('item/add')
  async createItem(
    @Body() input: CreateProjectItemDto,
  ) {
    return await this.projectService.createItem(input);
  }
}
