import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import fs from 'fs';

import { PostmanService } from './postman.service';
import { CreateDto } from './dto/create.dto';

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

  @Post('api/add')
  async createNewApi(
    @Body() createDto: CreateDto,
  ) {
    return this.postmanService.create(createDto);
  }
}
