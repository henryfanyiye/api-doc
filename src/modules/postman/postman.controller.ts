import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import fs from 'fs';
import { Response } from 'express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

import { PostmanService } from './postman.service';
import { User } from '../auth/decorator/user.decorator';
import { Public } from '../auth/decorator/auth.decorator';
import { createCsv } from '../../lib/helper';

@Controller('postman')
export class PostmanController {
  constructor(
    private readonly postmanService: PostmanService,
    private readonly config: ConfigService,
  ) {
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @User() user: any,
    @UploadedFile() file,
  ) {
    const { path } = file;
    const id = await this.postmanService.importCollection(user.member_id, path);
    await fs.unlinkSync(path);
    return id;
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
    const fields = [
      { label: 'Name', value: 'name' },
      { label: 'API', value: 'api' },
    ];
    await createCsv(title, fields, data);
    return `http://${this.config.get('hostname')}:${this.config.get('port')}/api/postman/download/${title}`;
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
