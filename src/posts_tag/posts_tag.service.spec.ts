import { Test, TestingModule } from '@nestjs/testing';
import { PostsTagService } from './posts_tag.service';

describe('PostsTagService', () => {
  let service: PostsTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsTagService],
    }).compile();

    service = module.get<PostsTagService>(PostsTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
