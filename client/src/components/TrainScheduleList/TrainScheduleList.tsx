import { List, Typography } from '@mui/material'
import { TrainSchedule } from '../../types/trainSchedule.type';
import { Item } from '../../styles/app.styles';
import TrainScheduleItem from '../TrainScheduleItem/TrainScheduleItem';

interface TrainScheduleListProps {
  trainSchedules: TrainSchedule[]
  handleDelete:(id:string) => void
  handleUpdate:(id:string) => void
}

const TrainScheduleList = ({
  trainSchedules,
  handleDelete,
  handleUpdate
}: TrainScheduleListProps): JSX.Element => {
  if (!trainSchedules.length) {
    return <Typography sx={{textAlign:'center', mt:'30px'}} variant='h5' >No schedules found.</Typography>
  }
  return (
    <>
      <List dense={true} sx={{background:'white'}} >
        {trainSchedules.map((trainSchedule) => (
          <TrainScheduleItem handleDelete={handleDelete} handleUpdate={handleUpdate} key={trainSchedule._id} trainSchedule={trainSchedule} />
        ))}
      </List>
    </>
  )
}

export default TrainScheduleList
