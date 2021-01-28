import { Test, TestingModule } from '@nestjs/testing';
import { PostmanResolver } from './postman.resolver';

describe('PostmanResolver', () => {
  let resolver: PostmanResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostmanResolver],
    }).compile();

    resolver = module.get<PostmanResolver>(PostmanResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
