import { Body, Controller, Post } from '@nestjs/common';

import { PostmanService } from './postman.service';
import { CreateDto } from './dto/create.dto';

@Controller('postman')
export class PostmanController {
  constructor(
    private readonly postmanService: PostmanService,
  ) {
  }

  @Post('api/add')
  async createNewApi(
    @Body() createDto: CreateDto,
  ) {
    return this.postmanService.create(createDto);
  }
}
