import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CountersService } from './counters.service';
import { Counter } from './entities/counter.entity';
import { CreateCounterInput } from './dto/create-counter.input';

@Resolver(() => Counter)
export class CountersResolver {
  constructor(private readonly countersService: CountersService) {}

  @Mutation(() => Counter)
  createCounter(
    @Args('createCounterInput') createCounterInput: CreateCounterInput,
  ) {
    return this.countersService.create(createCounterInput);
  }

  @Query(() => [Counter], { name: 'counters' })
  findAll() {
    return this.countersService.findAll();
  }

  @Query(() => Counter, { name: 'counter', nullable: true })
  findOneByname(@Args('name') name: string) {
    return this.countersService.findOneByName(name);
  }

  @Mutation(() => Counter, { nullable: true })
  increaseCounterByName(@Args('name') name: string) {
    return this.countersService.increaseByName(name);
  }

  @Mutation(() => Counter, { nullable: true })
  removeCounterByName(@Args('name') name: string) {
    return this.countersService.removeByName(name);
  }
}
