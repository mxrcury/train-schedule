import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { TrainScheduleModule } from './train-schedule/train-schedule.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASS}@maincluster.gfzboyw.mongodb.net/?retryWrites=true&w=majority`,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    }),
    TrainScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
