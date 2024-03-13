import { Test, TestingModule } from '@nestjs/testing';
import { CountersResolver } from './counters.resolver';
import { CountersService } from './counters.service';

describe('CountersResolver', () => {
  let resolver: CountersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountersResolver, CountersService],
    }).compile();

    resolver = module.get<CountersResolver>(CountersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
