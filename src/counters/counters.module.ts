import { Module } from '@nestjs/common';
import { CountersService } from './counters.service';
import { CountersResolver } from './counters.resolver';

@Module({
  providers: [CountersResolver, CountersService],
})
export class CountersModule {}
