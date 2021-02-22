import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import fs from 'fs';

import { PostmanService } from './postman.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectCatalogDto } from './dto/create-project-catalog.dto';

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

  @Post('project/catalog/add')
  async createCatalog(
    @Body() input: CreateProjectCatalogDto,
  ) {
    return await this.postmanService.createCatalog(input);
  }
}
