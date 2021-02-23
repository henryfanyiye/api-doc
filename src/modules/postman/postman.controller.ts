import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import fs from 'fs';

import { PostmanService } from './postman.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectCatalogDto } from './dto/create-project-catalog.dto';
import { CreateProjectItemDto } from './dto/create-project-item.dto';
import { Public } from '../auth/decorator/jwt.decorator';

@Controller('postman')
export class PostmanController {
  constructor(
    private readonly postmanService: PostmanService,
  ) {
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const { filename, path } = file;
    await fs.readFileSync(path, {
      encoding: 'utf8',
    });
    await this.postmanService.mappingAndInsert(path);
    await fs.unlinkSync(path);
    return;
  }

  @Post('project/add')
  async createProject(
    @Body() input: CreateProjectDto,
  ) {
    return await this.postmanService.createProject(input);
  }

  @Public()
  @Get('project/:id')
  async queryProject(
    @Param() id: number,
  ) {
    return await this.postmanService.queryProject(id);
  }

  @Post('project/catalog/add')
  async createCatalog(
    @Body() input: CreateProjectCatalogDto,
  ) {
    return await this.postmanService.createCatalog(input);
  }

  @Post('project/item/add')
  async createItem(
    @Body() input: CreateProjectItemDto,
  ) {
    return await this.postmanService.createItem(input);
  }
}
