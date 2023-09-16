import { Test, TestingModule } from '@nestjs/testing';
import { UserTagResolver } from './user_tag.resolver';

describe('UserTagResolver', () => {
  let resolver: UserTagResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTagResolver],
    }).compile();

    resolver = module.get<UserTagResolver>(UserTagResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
