import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import { ObjectID } from 'mongodb'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

import { TrainSchedule } from './train-schedule.entity'
import { TrainScheduleInput } from './train-schedule.input'
import { SortByPicker } from 'src/consts'

@Injectable()
export class TrainScheduleService {
  constructor(
    @InjectRepository(TrainSchedule)
    private readonly trainScheduleRepository: MongoRepository<TrainSchedule>
  ) {}
  async create(input: TrainScheduleInput): Promise<TrainSchedule> {
    this.validateInput(input)
    const trainSchedule = await this.trainScheduleRepository.save(
      new TrainSchedule(input)
    )
    return trainSchedule
  }
  async get(searchText?: string, sortBy?: string): Promise<TrainSchedule[]> {
    return await this.trainScheduleRepository.find({
      where:
        searchText && searchText.length
          ? {
              $or: [
                { startingStation: { $regex: searchText, $options: 'i' } },
                { terminalStation: { $regex: searchText, $options: 'i' } },
              ],
            }
          : {},
      order: sortBy && sortBy.length ? SortByPicker[sortBy] : {},
    })
  }
  async update(id: ObjectID, input: TrainSchedule): Promise<void> {
    this.validateId(id)
    this.trainScheduleRepository.findOneAndUpdate(
      { _id: new ObjectID(id) },
      { $set: input }
    )
    return
  }
  async delete(id: ObjectID): Promise<void> {
    this.validateId(id)
    await this.trainScheduleRepository.deleteOne({
      _id: new ObjectID(id),
    })
    return
  }
  async searchByText(text: string): Promise<TrainSchedule[]> {
    return await this.trainScheduleRepository.find({
      where: {
        $or: [
          { startingStation: { $regex: text, $options: 'i' } },
          { terminalStation: { $regex: text, $options: 'i' } },
        ],
      },
    })
  }
  validateId(id: string): boolean {
    const checkForIdRegExp = new RegExp('^[0-9a-fA-F]{24}$')
    const isValidId =
      id.length === 12 || (id.length === 24 && checkForIdRegExp.test(id))
    if (!isValidId) {
      throw new HttpException('Incorrect id', HttpStatus.NOT_FOUND)
    }
    return
  }
  async validateInput(input: TrainScheduleInput) {
    const trainScheduleToClass = plainToClass(TrainSchedule, input)
    const isValidTrainSchedule = (await validate(trainScheduleToClass)).length
    if (isValidTrainSchedule) {
      throw new HttpException('Wrong input', HttpStatus.BAD_REQUEST)
    }
    return
  }
}
