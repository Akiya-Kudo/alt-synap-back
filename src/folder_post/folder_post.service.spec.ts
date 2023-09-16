import { Test, TestingModule } from '@nestjs/testing';
import { FolderPostService } from './folder_post.service';

describe('FolderPostService', () => {
  let service: FolderPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FolderPostService],
    }).compile();

    service = module.get<FolderPostService>(FolderPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
