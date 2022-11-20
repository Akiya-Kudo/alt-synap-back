import { Test, TestingModule } from '@nestjs/testing';
import { BlogContentService } from './blog_content.service';

describe('BlogContentService', () => {
  let service: BlogContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogContentService],
    }).compile();

    service = module.get<BlogContentService>(BlogContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
