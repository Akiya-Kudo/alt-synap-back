import { Test, TestingModule } from '@nestjs/testing';
import { MemoContentResolver } from './memo_content.resolver';

describe('MemoContentResolver', () => {
  let resolver: MemoContentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemoContentResolver],
    }).compile();

    resolver = module.get<MemoContentResolver>(MemoContentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
