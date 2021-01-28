import { Injectable } from '@nestjs/common';
import { APISchema } from './models/api.model';

@Injectable()
export class PostmanService {
  async findById(id: number): Promise<APISchema> {
    return {
      id,
    } as any;
  }
}
