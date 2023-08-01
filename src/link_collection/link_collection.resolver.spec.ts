import { Test, TestingModule } from '@nestjs/testing';
import { LinkCollectionResolver } from './link_collection.resolver';

describe('LinkCollectionResolver', () => {
  let resolver: LinkCollectionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkCollectionResolver],
    }).compile();

    resolver = module.get<LinkCollectionResolver>(LinkCollectionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
