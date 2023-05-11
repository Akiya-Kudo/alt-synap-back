import { Test, TestingModule } from '@nestjs/testing';
import { PostsTagResolver } from './posts_tag.resolver';

describe('PostsTagResolver', () => {
  let resolver: PostsTagResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsTagResolver],
    }).compile();

    resolver = module.get<PostsTagResolver>(PostsTagResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
