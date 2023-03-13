import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react'

import {
  Alert,
  Box,
  Button,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'

import axios from 'axios'

import { useAppContext } from './providers/context'
import {
  addTrainSchedule,
  deleteTrainScheduleById,
  getAllTrainSchedules,
  setCurrentTrainScheduleId,
  setTrainSchedules,
  updateTrainScheduleById,
} from './providers/reducer'
import TrainScheduleList from './components/TrainScheduleList/TrainScheduleList'
import { alert, button, headTitle, newScheduleContainer, SearchFormContainer, TrainScheduleListContainer } from './styles/app.styles'
import { AuthModal } from './components/AuthModal/AuthModal'
import SortBySelect, { SortingTypes } from './components/SortBySelect/SortBySelect'
import CreateModal from './components/CreateModal/CreateModal'
import { TrainSchedule } from '../../server/src/train-schedule/train-schedule.entity';

function App(): JSX.Element {
  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setUpdateModalOpen] = useState<boolean>(false)
  const [isActiveFormValidAlert, setActiveFormValidAlert] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [sortBy, setSortBy] = useState<SortingTypes>('')
  const { state, dispatch } = useAppContext()

  const handleSortBy = (e:SelectChangeEvent<SortingTypes>) => {
    setSortBy(e.target.value as SortingTypes)
  }

  const getAll = async(): Promise<void> => {
    const items = await getAllTrainSchedules({text:'', sortBy})
    dispatch(setTrainSchedules(items))
  }
  const handleCreateModalOpen = () => {
    setCreateModalOpen(true)
  }
  const createTrainSchedule = async (values:{[prop:string] :any}) => {
    for (const key in values) {
      if(!values[key]) {
        setActiveFormValidAlert(true)
        setTimeout(() => {
          setActiveFormValidAlert(false)
        }, 3000);
        return
      }
    }
      await axios.post('http://localhost:3000/train-schedule', values)
      dispatch(addTrainSchedule(values as TrainSchedule))
  }
  const deleteTrainSchedule = async(id:string):Promise<void> => {
    await axios.delete(`http://localhost:3000/train-schedule/${id}`)
    dispatch(deleteTrainScheduleById(id))
  } 
  const handleCurrentTrainScheduleId = (id:string) => {
      dispatch(setCurrentTrainScheduleId(id))
      setUpdateModalOpen(true)
  }
  const updateTrainSchedule = async (values: {[key:string]:any}):Promise<void> => {
    const valuesForUpdate:{[key:string]: any} = {}
    for (const key in values) {
      if (values[key]) {
        valuesForUpdate[key] = values[key]
      }
    }
    await axios.patch(`http://localhost:3000/train-schedule/${state.currentTrainScheduleId}`,valuesForUpdate)
    dispatch(updateTrainScheduleById(valuesForUpdate))
  } 

  const handleSearch = async (
    e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    const items = await getAllTrainSchedules({text:inputValue, sortBy})
    dispatch(setTrainSchedules(items))
  }
  useEffect(() => {
      getAll()
  }, [state.isAuth])

  if (!state.isAuth) {
    return <AuthModal />
  }
  return (
    <>
      {isActiveFormValidAlert ? <Alert sx={alert} severity='error' >Enter all values</Alert> : null}
      <Typography sx={headTitle}>
        You're connected as <b>{state.username}</b>
      </Typography>
      <Box sx={newScheduleContainer}>
        <Button
          sx={{ marginRight: '5px' }}
          variant="outlined"
          color="secondary"
          onClick={handleCreateModalOpen}
        >
          New Schedule
        </Button>
        <Button
            // sx={button}
            variant="outlined"
            color="secondary"
            onClick={getAll}
            // type="submit"
          >
            GET ALL
          </Button>
      </Box>
      <CreateModal title='Create' isOpenModal={isCreateModalOpen} setModalOpen={setCreateModalOpen} getAllValues={createTrainSchedule} />
      <CreateModal title='Update' isOpenModal={isUpdateModalOpen} setModalOpen={setUpdateModalOpen} getAllValues={updateTrainSchedule} />      
      <Box
        sx={SearchFormContainer}
      >
        <form onSubmit={handleSearch}>
          <TextField
            color="secondary"
            value={inputValue}
            placeholder="Enter a station name"
            onChange={(e) => setInputValue(e.target.value)}
          />{' '}
          <Button
            sx={button}
            variant="outlined"
            color="secondary"
            onClick={handleSearch}
            type="submit"
          >
            Search
          </Button>
        </form>
          <SortBySelect sortBy={sortBy} handleSortBy={handleSortBy} />
      </Box>
      <Box sx={ TrainScheduleListContainer }>
        <TrainScheduleList handleDelete={deleteTrainSchedule} handleUpdate={handleCurrentTrainScheduleId} trainSchedules={state.trainSchedulesItems} />
      </Box>
    </>
  )
}

export default App
