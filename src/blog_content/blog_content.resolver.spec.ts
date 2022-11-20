import { Test, TestingModule } from '@nestjs/testing';
import { BlogContentResolver } from './blog_content.resolver';

describe('BlogContentResolver', () => {
  let resolver: BlogContentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogContentResolver],
    }).compile();

    resolver = module.get<BlogContentResolver>(BlogContentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
