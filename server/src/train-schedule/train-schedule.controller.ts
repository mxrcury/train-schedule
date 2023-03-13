import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'

import { TrainScheduleService } from './train-schedule.service'
import { TrainSchedule } from './train-schedule.entity'
import { TrainScheduleInput } from './train-schedule.input'

@Controller('train-schedule')
export class TrainScheduleController {
  constructor(private readonly trainSchedule: TrainScheduleService) {}
  @Get()
  async getAllTrainSchedule(
    @Query('search') searchText: string,
    @Query('sortBy') sortBy: string
  ): Promise<TrainSchedule[]> {
    return await this.trainSchedule.get(searchText, sortBy)
  }
  @Post()
  async addTrainSchedule(
    @Body() trainScheduleBody: TrainScheduleInput
  ): Promise<TrainSchedule> {
    return await this.trainSchedule.create(trainScheduleBody)
  }
  @Patch('/:id')
  async updateTrainSchedule(
    @Param('id') id: string,
    @Body() trainSchedule: TrainSchedule
  ): Promise<void> {
    return await this.trainSchedule.update(id, trainSchedule)
  }
  @Delete('/:id')
  async deleteTrainSchedule(@Param('id') id: string): Promise<void> {
    return await this.trainSchedule.delete(id)
  }
}
