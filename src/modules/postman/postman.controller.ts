import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import fs from 'fs';

import { PostmanService } from './postman.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectCatalogDto } from './dto/create-project-catalog.dto';
import { CreateProjectItemDto } from './dto/create-project-item.dto';
import { User } from '../auth/decorator/user.decorator';
import { UserService } from '../user/user.service';

@Controller('postman')
export class PostmanController {
  constructor(
    private readonly postmanService: PostmanService,
    private readonly userService: UserService,
  ) {
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @User() user: any,
    @UploadedFile() file,
  ) {
    const { uid } = user;
    const { filename, path } = file;
    await fs.readFileSync(path, {
      encoding: 'utf8',
    });
    await this.postmanService.mappingAndInsert(uid, path);
    await fs.unlinkSync(path);
    return;
  }

  @Post('project/add')
  async createProject(
    @User() user: any,
    @Body() input: CreateProjectDto,
  ) {
    const { uid } = user;
    const pid = await this.postmanService.createProject(uid, input);
    return { pid };
  }

  @Get('project/:id')
  async queryProject(
    @User() user: any,
  ) {
    const { uid } = user;
    return await this.postmanService.queryProject(uid);
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
