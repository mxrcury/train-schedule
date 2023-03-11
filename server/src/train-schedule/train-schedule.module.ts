import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainSchedule } from './train-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrainSchedule])],
  providers: []
})

export class TrainScheduleModule{}
