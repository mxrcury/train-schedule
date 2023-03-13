import React, { useRef, useState } from 'react'

import { Button, Modal, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'

import {TrainSchedule} from '../../types/trainSchedule.type'
import styles from '../AuthModal/AuthModal.styles'
import { DateField, DateTimeField, LocalizationProvider, TimeField } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ClearIcon from '@mui/icons-material/Clear';

interface CreateModalProps {
  title: string
  isOpenModal: boolean
  setModalOpen: (value: boolean) => void
  getAllValues: (args: { [prop: string]: any } ) => void
}

const CreateModal = ({
  title,
  isOpenModal,
  setModalOpen,
  getAllValues,
}: CreateModalProps) => {
  const [date, setDate] = useState<{
    departureDate: string
    arrivalDate: string
  }>({ departureDate: '', arrivalDate: '' })
  const [stations, setStations] = useState<{
    terminalStation: string
    startingStation: string
  }>({ terminalStation: '', startingStation: '' })
  const [fullTicketPrice, setFullTicketPrice] = useState<number>(0)
  const handleModalOpen = () => {
    getAllValues({ ...stations, fullTicketPrice, ...date })
    setModalOpen(false)
  }

  return (
    <div>
      <Modal
        open={isOpenModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modal}>
          <Button onClick={() => setModalOpen(false)} color='error' ><ClearIcon/></Button>
          <Typography variant="h5">Create a new schedule</Typography>
          <Typography id="modal-modal-title">Starting station:</Typography>
          <TextField
            value={stations.startingStation}
            onChange={(e) =>
              setStations((prevStations) => ({
                ...prevStations,
                startingStation: e.target.value,
              }))
            }
            placeholder="Enter a starting station"
          />
          <Typography id="modal-modal-title">Terminal station:</Typography>
          <TextField
            value={stations.terminalStation}
            onChange={(e) =>
              setStations((prevStations) => ({
                ...prevStations,
                terminalStation: e.target.value,
              }))
            }
            placeholder="Enter a terminal station"
            sx={{ mb: '10px' }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div >
              <div style={{ marginRight: '10px' }}>
                <Typography sx={{mb:'5px'}} id="modal-modal-title">Departure:</Typography>
                <DateTimeField
                  label="Pick date and time"
                  onChange={(e) => {
                    console.log(e)
                    setDate((prevDate) => ({
                    ...prevDate,
                    departureDate: JSON.stringify(e),
                  }))}
                }
                    />
              </div>
              <div>
                <Typography sx={{mb:'5px'}}  id="modal-modal-title">Arrival:</Typography>
                <DateTimeField
                  label="Pick date and time"
                  onChange={(e) => {
                    console.log(e)
                    setDate((prevDate) => ({
                    ...prevDate,
                    arrivalDate: JSON.stringify(e),
                  }))}
                }
                    />
              </div>
            </div>
          </LocalizationProvider>
          <Typography id="modal-modal-title">Pick a ticket price:</Typography>
          <TextField
            type="number"
            defaultValue={0}
            value={fullTicketPrice}
            onChange={(e) => setFullTicketPrice(+e.target.value)}
          />
          <div>
            <Button
              onClick={handleModalOpen}
              color="secondary"
              variant="contained"
              sx={{ marginTop: '20px' }}
            >
              {title}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default CreateModal
