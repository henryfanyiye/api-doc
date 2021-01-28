import { Test, TestingModule } from '@nestjs/testing';
import { PostmanService } from './postman.service';

describe('PostmanService', () => {
  let service: PostmanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostmanService],
    }).compile();

    service = module.get<PostmanService>(PostmanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
