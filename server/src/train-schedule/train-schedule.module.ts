import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TrainSchedule } from './train-schedule.entity'
import { TrainScheduleService } from './train-schedule.service'
import { TrainScheduleController } from './train-schedule.controller'

@Module({
  imports: [TypeOrmModule.forFeature([TrainSchedule])],
  controllers: [TrainScheduleController],
  providers: [TrainScheduleService],
})
export class TrainScheduleModule {}
