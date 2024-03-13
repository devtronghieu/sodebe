import { Injectable } from '@nestjs/common';
import { CreateCounterInput } from './dto/create-counter.input';
import { UpdateCounterInput } from './dto/update-counter.input';
import { Counter } from './entities/counter.entity';

@Injectable()
export class CountersService {
  create(createCounterInput: CreateCounterInput) {
    return 'This action adds a new counter';
  }

  findAll() {
    const counters: Counter[] = [];
    return counters;
  }

  findOne(id: number) {
    return `This action returns a #${id} counter`;
  }

  update(id: number, updateCounterInput: UpdateCounterInput) {
    return `This action updates a #${id} counter`;
  }

  remove(id: number) {
    return `This action removes a #${id} counter`;
  }
}
