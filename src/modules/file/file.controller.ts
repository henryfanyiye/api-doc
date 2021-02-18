import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { PostmanController } from '../postman/postman.controller';

@Controller('file')
export class FileController {
  constructor(
    private readonly postmanController: PostmanController,
  ) {
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const { filename, path } = file;
    await fs.readFileSync(path, {
      encoding: 'utf8',
    });
    await this.postmanController.mappingAndInsert(path);
    await fs.unlinkSync(path);
    return;
  }
}
