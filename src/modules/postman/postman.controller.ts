import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import fs from 'fs';
import { Response } from 'express';
import { join } from 'path';

import { PostmanService } from './postman.service';
import { User } from '../auth/decorator/user.decorator';
import { Public } from '../auth/decorator/jwt.decorator';

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

  @Public()
  @Post('getApiList')
  @UseInterceptors(FileInterceptor('file'))
  async getApiList(
    @UploadedFile() file,
  ) {
    const { path, filename } = file;
    const data = await this.postmanService.getApiList(path);
    const title = filename.replace('.json', '.csv');
    await this.postmanService.createCsv(title, data);
    return `http://127.0.0.1:3000/api/postman/download/${title}`;
  }

  @Public()
  @Get('download/:file')
  getFile(@Res() res: Response, @Param() params) {
    const path = join(__dirname, '../../files', params.file);
    res.download(path, err => {
      if (err) {
        res.json({ code: 404, message: '文件不存在' });
      }
      res.end();
    });
  }
}
