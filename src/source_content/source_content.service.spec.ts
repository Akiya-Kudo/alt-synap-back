import { Test, TestingModule } from '@nestjs/testing';
import { SourceContentService } from './source_content.service';

describe('SourceContentService', () => {
  let service: SourceContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SourceContentService],
    }).compile();

    service = module.get<SourceContentService>(SourceContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
