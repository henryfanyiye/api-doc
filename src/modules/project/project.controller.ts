import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

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

  @Delete('project/:id')
  async deleteProject(
    @Param('id') id: string,
  ) {
    return await this.projectService.deleteProject(Number(id));
  }

  @Post('catalog/add')
  async createCatalog(
    @Body() input: CreateProjectCatalogDto,
  ) {
    return await this.projectService.createCatalog(input);
  }

  @Get('catalog/:id')
  async queryCatalog(
    @Param('id') id: string,
  ) {
    return this.projectService.queryCatalog(Number(id));
  }

  @Post('catalog/update/:id')
  async updateCatalog(
    @Param('id') id: string,
    @Body() input: CreateProjectCatalogDto,
  ) {
    return this.projectService.updateCatalog(Number(id), input);
  }

  @Delete('catalog/:id')
  async deleteCatalog(
    @Param('id') id: string,
  ) {
    return this.projectService.deleteCatalog(Number(id));
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
    @Param('id') id: string,
    @Body() input: CreateProjectItemDto,
  ) {
    return await this.projectService.updateItem(Number(id), input);
  }

  @Delete('item/:id')
  async deleteItem(
    @Param('id') id: string,
  ) {
    return this.projectService.deleteItem(Number(id));
  }

  @Get('/:id')
  async queryProjectInfo(
    @Param('id') id: string,
  ) {
    return await this.projectService.queryProjectInfo(Number(id));
  }
}
