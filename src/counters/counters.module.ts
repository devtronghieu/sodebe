import { Module } from '@nestjs/common';
import { CountersService } from './counters.service';
import { CountersResolver } from './counters.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Counter, CounterSchema } from './entities/counter.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Counter.name,
        schema: CounterSchema,
      },
    ]),
  ],
  providers: [CountersResolver, CountersService],
})
export class CountersModule {}
