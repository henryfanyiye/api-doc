import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { hash } from 'typeorm/util/StringUtils';

import { User } from '../auth/decorator/user.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectCatalogDto } from './dto/create-project-catalog.dto';
import { CreateProjectItemDto } from './dto/create-project-item.dto';
import { ProjectService } from './project.service';
import { UpdateProjectItemDto } from './dto/update-project-item.dto';

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
    const pid = await this.projectService.createProject(user.member_id, input);
    return { pid };
  }

  @Get('project/:id')
  async queryProject(
    @Param('id') id: number,
  ) {
    return await this.projectService.queryProject(id);
  }

  @Get(':id')
  async queryProjectInfo(
    @Param('id') id: string,
  ) {
    return await this.projectService.queryProjectInfo(Number(id));
  }

  @Post('project/update/:id')
  async updateProject(
    @Param('id') id: number,
    @Body() input: CreateProjectDto,
  ) {
    return await this.projectService.updateProject(id, input);
  }

  @Delete('project/:id')
  async deleteProject(
    @Param('id') id: number,
  ) {
    return await this.projectService.deleteProject(id);
  }

  @Post('project/transfer')
  async transferProject(
    @User() user: any,
    @Body() data: any,
  ) {
    const { project_id, username, password } = data;
    return await this.projectService.transferProject(user.member_id, password, project_id, username);
  }

  @Post('catalog/add')
  async createCatalog(
    @Body() input: CreateProjectCatalogDto,
  ) {
    return await this.projectService.createCatalog(input);
  }

  @Post('catalog/update/:id')
  async updateCatalog(
    @Param('id') id: number,
    @Body() input: CreateProjectCatalogDto,
  ) {
    return this.projectService.updateCatalog(id, input);
  }

  @Delete('catalog/:id')
  async deleteCatalog(
    @Param('id') id: number,
  ) {
    return this.projectService.deleteCatalog(id);
  }

  @Post('item/add')
  async createItem(
    @Body() input: CreateProjectItemDto,
  ) {
    return await this.projectService.createItem(input);
  }

  @Get('item/:id')
  async queryItem(
    @Param('id') id: string,
  ) {
    return this.projectService.queryItem(Number(id));
  }

  @Post('item/update/:id')
  async updateItem(
    @Param('id') id: number,
    @Body() input: UpdateProjectItemDto,
  ) {
    return await this.projectService.updateItem(id, input);
  }

  @Delete('item/:id')
  async deleteItem(
    @Param('id') id: string,
  ) {
    return this.projectService.deleteItem(Number(id));
  }
}
