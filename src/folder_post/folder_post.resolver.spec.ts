import { Test, TestingModule } from '@nestjs/testing';
import { FolderPostResolver } from './folder_post.resolver';

describe('FolderPostResolver', () => {
  let resolver: FolderPostResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FolderPostResolver],
    }).compile();

    resolver = module.get<FolderPostResolver>(FolderPostResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
