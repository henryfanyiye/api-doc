import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import fs from 'fs';

import { PostmanService } from './postman.service';
import { User } from '../auth/decorator/user.decorator';

@Controller('postman')
export class PostmanController {
  constructor(
    private readonly postmanService: PostmanService,
  ) {
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @User() user: any,
    @UploadedFile() file,
  ) {
    const { uid } = user;
    const { path } = file;
    await this.postmanService.mappingAndInsert(uid, path);
    await fs.unlinkSync(path);
    return;
  }

  @Post('getApiList')
  @UseInterceptors(FileInterceptor('file'))
  async getApiList(
    @User() user: any,
    @UploadedFile() file,
  ) {
    const { uid } = user;
    const { path } = file;
    return await this.postmanService.getApiList(uid, path);
  }
}
