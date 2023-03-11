import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainSchedule } from './train-schedule.entity';
import { MongoRepository } from 'typeorm';
import { TrainScheduleInput } from './train-schedule.input';

@Injectable()
export class TrainScheduleService {
    constructor(
        @InjectRepository(TrainSchedule)
        private readonly userRepository: MongoRepository<TrainSchedule>
    ) { }
    async create(input: TrainScheduleInput): Promise<TrainSchedule> {
        const trainSchedule = await this.userRepository.create(input)
        return trainSchedule
    }
}
