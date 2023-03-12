import React from 'react'
import { Item } from '../../styles/app.styles'
import { Button, Typography } from '@mui/material'
import { TrainSchedule } from '../../types/trainSchedule.type'
import { styles } from './TrainSchedule.styles'

interface TrainScheduleItemProps {
  trainSchedule: TrainSchedule,
  handleDelete:(id:string) => void
  handleUpdate:(id:string) => void
}

const TrainScheduleItem = ({ trainSchedule, handleDelete, handleUpdate }: TrainScheduleItemProps) => {
  const onDelete = () => {
    handleDelete(trainSchedule._id)
  }
  const onUpdate = () => {
    handleUpdate(trainSchedule._id)
  }

  return (
    <div
      style={styles.container}
    >
      <Item>
        <Typography>
          <b> Starting station:</b>
        </Typography>
        <Typography>{trainSchedule.startingStation}</Typography>
      </Item>
      <Item>
        <Typography>
          <b> Terminal station:</b>
        </Typography>
        <Typography>{trainSchedule.terminalStation}</Typography>
      </Item>
      <Item>
        <Typography>
          <b> Departure time:</b>
        </Typography>
        <Typography>{`${new Date(JSON.parse(trainSchedule.departureDate)).toLocaleString()}`}</Typography>
      </Item>
      <Item>
        <Typography>
          <b> Arrival time:</b>
        </Typography>
        <Typography>{`${new Date(JSON.parse(trainSchedule.arrivalDate)).toLocaleString()}`}</Typography>
      </Item>
      <Item>
        <Typography>
          <b> Ticket price:</b>
        </Typography>
        <Typography>{trainSchedule.fullTicketPrice} USD</Typography>
      </Item>
      <Button onClick={onUpdate} color='secondary' >
        Edit
      </Button>
      <Button onClick={onDelete} color='secondary' >
        Delete
      </Button>
    </div>
  )
}

export default TrainScheduleItem
