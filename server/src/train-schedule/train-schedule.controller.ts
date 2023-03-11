import { Controller, Get } from '@nestjs/common';

@Controller('train-schedule')
export class TrainScheduleController {
  @Get()
  getAll(): string {
    return '<h1>train scheudle</h1>';
  }
}
