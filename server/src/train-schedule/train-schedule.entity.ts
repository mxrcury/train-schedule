import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class TrainSchedule {
  @ObjectIdColumn()
  _id: string;
  @Column()
  startingStation: string;
  @Column()
  terminalStation: string;
  @Column()
  departureTime: string;
  @Column()
  arrivalTime: string;
  @Column()
  fullTicketPrice: string;
}
