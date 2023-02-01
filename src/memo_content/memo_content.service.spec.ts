import { Test, TestingModule } from '@nestjs/testing';
import { MemoContentService } from './memo_content.service';

describe('MemoContentService', () => {
  let service: MemoContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemoContentService],
    }).compile();

    service = module.get<MemoContentService>(MemoContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
