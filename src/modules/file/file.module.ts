import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { FileController } from './file.controller';
import { FileService } from './file.service';
import { PostmanController } from '../postman/postman.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postman } from '../postman/postman.entity';
import { PostmanService } from '../postman/postman.service';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        //自定义路径
        destination: `./fileUpload/`,
        filename: (req, file, cb) => {
          return cb(null, file.originalname);
        },
      }),
    }),
    TypeOrmModule.forFeature([Postman]),
  ],
  controllers: [FileController],
  providers: [
    FileService,
    PostmanController,
    PostmanService,
  ],
})
export class FileModule {
}
