import { Test, TestingModule } from '@nestjs/testing';
import { ArticleContentResolver } from './article_content.resolver';

describe('ArticleContentResolver', () => {
  let resolver: ArticleContentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleContentResolver],
    }).compile();

    resolver = module.get<ArticleContentResolver>(ArticleContentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
