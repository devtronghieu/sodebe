import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CountersService } from './counters.service';
import { Counter } from './entities/counter.entity';
import { CreateCounterInput } from './dto/create-counter.input';

@Resolver()
export class CountersResolver {
  constructor(private readonly countersService: CountersService) {}

  @Mutation(() => Counter)
  async createCounter(
    @Args('createCounterInput') createCounterInput: CreateCounterInput,
  ) {
    return this.countersService.create(createCounterInput);
  }

  @Query(() => [Counter], { name: 'counters' })
  async findAll() {
    return this.countersService.findAll();
  }

  @Query(() => Counter, { name: 'counter', nullable: true })
  async findOneByname(@Args('name') name: string) {
    return this.countersService.findOneByName(name);
  }

  @Mutation(() => Counter, { nullable: true })
  async increaseCounterByName(@Args('name') name: string) {
    return this.countersService.increaseByName(name);
  }

  @Mutation(() => Counter, { nullable: true })
  async removeCounterByName(@Args('name') name: string) {
    return this.countersService.removeByName(name);
  }
}
