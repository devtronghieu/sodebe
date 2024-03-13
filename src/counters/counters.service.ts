import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateCounterInput } from './dto/create-counter.input';
import { Counter } from './entities/counter.entity';

@Injectable()
export class CountersService {
  counters: Map<string, Counter> = new Map();

  create(createCounterInput: CreateCounterInput) {
    if (this.counters.has(createCounterInput.name)) {
      throw new ConflictException();
    }

    const counter: Counter = {
      count: 0,
      name: createCounterInput.name,
    };
    this.counters.set(createCounterInput.name, counter);

    return counter;
  }

  findAll() {
    return Array.from(this.counters.values());
  }

  findOneByName(name: string) {
    if (this.counters.has(name)) {
      return this.counters.get(name);
    } else {
      throw new NotFoundException();
    }
  }

  increaseByName(name: string) {
    if (this.counters.has(name)) {
      const counter = this.counters.get(name);
      counter.count++;
      return counter;
    } else {
      throw new NotFoundException();
    }
  }

  removeByName(name: string) {
    if (this.counters.has(name)) {
      const counter = this.counters.get(name);
      this.counters.delete(name);
      return counter;
    } else {
      throw new NotFoundException();
    }
  }
}
