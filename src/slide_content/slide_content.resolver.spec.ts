import { Test, TestingModule } from '@nestjs/testing';
import { SlideContentResolver } from './slide_content.resolver';

describe('SlideContentResolver', () => {
  let resolver: SlideContentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlideContentResolver],
    }).compile();

    resolver = module.get<SlideContentResolver>(SlideContentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
