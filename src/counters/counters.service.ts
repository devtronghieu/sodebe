import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateCounterInput } from './dto/create-counter.input';
import { Counter } from './entities/counter.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CountersService {
  constructor(
    @InjectModel(Counter.name) private counterModel: Model<Counter>,
  ) {}

  async create(createCounterInput: CreateCounterInput): Promise<Counter> {
    const { name } = createCounterInput;

    const counter = await this.counterModel.findOne({ name });

    if (counter) {
      throw new ConflictException();
    }

    return this.counterModel.create({
      name,
      count: 0,
    });
  }

  async findAll(): Promise<Counter[]> {
    return this.counterModel.find().exec();
  }

  async findOneByName(name: string): Promise<Counter> {
    const counter = await this.counterModel.findOne({ name });

    if (!counter) {
      throw new NotFoundException();
    }

    return counter;
  }

  async increaseByName(name: string): Promise<Counter> {
    const counter = await this.counterModel.findOneAndUpdate(
      { name },
      { $inc: { count: 1 } },
      { new: true },
    );

    if (!counter) {
      throw new NotFoundException();
    }

    return counter;
  }

  async removeByName(name: string) {
    const counter = await this.counterModel.findOneAndDelete({ name });

    if (!counter) {
      throw new NotFoundException();
    }

    return counter;
  }
}
