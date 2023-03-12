import { Entity, ObjectIdColumn, Column } from 'typeorm'

@Entity()
export class TrainSchedule {
  @ObjectIdColumn()
  _id: string
  @Column()
  startingStation: string
  @Column()
  terminalStation: string
  @Column()
  departureDate: string
  @Column()
  arrivalDate: string
  @Column()
  fullTicketPrice: string
  constructor(trainSchedule?: Partial<TrainSchedule>) {
    Object.assign(this, trainSchedule)
  }
}
