import { Test, TestingModule } from '@nestjs/testing';
import { SourceContentResolver } from './source_content.resolver';

describe('SourceContentResolver', () => {
  let resolver: SourceContentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SourceContentResolver],
    }).compile();

    resolver = module.get<SourceContentResolver>(SourceContentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
