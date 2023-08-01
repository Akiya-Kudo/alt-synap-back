import { Test, TestingModule } from '@nestjs/testing';
import { LinkCollectionService } from './link_collection.service';

describe('LinkCollectionService', () => {
  let service: LinkCollectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkCollectionService],
    }).compile();

    service = module.get<LinkCollectionService>(LinkCollectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
