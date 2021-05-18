import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User } from '../auth/decorator/user.decorator';
import { EnvironmentService } from './environment.service';
import { EnvironmentDto } from './dto/environment.dto';
import { copyjson } from '../../lib/helper';

@Controller('environment')
export class EnvironmentController {
  constructor(
    private readonly envService: EnvironmentService
  ) {
  }

  @Get('list')
  async getAll(
    @User() user: any
  ) {
    return this.envService.list(user.member_id);
  }

  @Get(':id')
  async detail(
    @Param('id') id: number
  ) {
    let res = await this.envService.detail(id);
    res.env_value = JSON.parse(res.env_value);
    return res;
  }

  @Post('create')
  async create(
    @User() user: any,
    @Body() data: EnvironmentDto
  ) {
    return this.envService.create(user.member_id, data);
  }

  @Post('update')
  async update(
    @Body() data: EnvironmentDto
  ) {
    await this.envService.update(data);
    return;
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number
  ) {

  }
}
