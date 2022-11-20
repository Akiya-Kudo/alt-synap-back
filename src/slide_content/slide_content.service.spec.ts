import { Test, TestingModule } from '@nestjs/testing';
import { SlideContentService } from './slide_content.service';

describe('SlideContentService', () => {
  let service: SlideContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlideContentService],
    }).compile();

    service = module.get<SlideContentService>(SlideContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
