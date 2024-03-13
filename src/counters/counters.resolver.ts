import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CountersService } from './counters.service';
import { Counter } from './entities/counter.entity';
import { CreateCounterInput } from './dto/create-counter.input';
import { UpdateCounterInput } from './dto/update-counter.input';

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

  @Query(() => Counter, { name: 'counter' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.countersService.findOne(id);
  }

  @Mutation(() => Counter)
  updateCounter(
    @Args('updateCounterInput') updateCounterInput: UpdateCounterInput,
  ) {
    return this.countersService.update(
      updateCounterInput.id,
      updateCounterInput,
    );
  }

  @Mutation(() => Counter)
  removeCounter(@Args('id', { type: () => Int }) id: number) {
    return this.countersService.remove(id);
  }
}
