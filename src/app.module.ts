import { Module } from '@nestjs/common';
import { CounterGateWay } from './counter.gateway';

@Module({
  providers: [CounterGateWay],
})
export class AppModule {}
