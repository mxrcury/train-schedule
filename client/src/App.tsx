import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import axios from 'axios'
import React, {
  FormEvent,
  useEffect,
  useState,
} from 'react'
import { useAppContext } from './providers/context'
import {
  deleteTrainScheduleById,
  getAllTrainSchedules,
  setCurrentTrainScheduleId,
  setTrainSchedules,
} from './providers/reducer'
import TrainScheduleList from './components/TrainScheduleList/TrainScheduleList'
import { button } from './styles/app.styles'
import { AuthModal } from './components/AuthModal/AuthModal'
import SortBySelect, { SortingTypes } from './components/SortBySelect/SortBySelect'
import CreateModal from './components/CreateModal/CreateModal'

function App(): JSX.Element {
  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [sortBy, setSortBy] = useState<SortingTypes>('')
  const { state, dispatch } = useAppContext()

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true)
  }
  const createTrainSchedule = async (values:{[prop:string] :any}) => {
    for (const key in values) {
      if(!values[key]) {
        return
      }
    }
    await axios.post('http://localhost:3000/train-schedule', values)
  }
  const deleteTrainSchedule = async(id:string):Promise<void> => {
    await axios.delete(`http://localhost:3000/train-schedule/${id}`)
    dispatch(deleteTrainScheduleById(id))
  } 
  const handleCurrentTrainScheduleId = (id:string) => {
      dispatch(setCurrentTrainScheduleId(id))
  }
  const updateTrainSchedule = async(id:string):Promise<void> => {
    await axios.patch(`http://localhost:3000/train-schedule/${state.currentTrainScheduleId}`,)
  } 

  const handleSearch = async (
    e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    const items = await getAllTrainSchedules(inputValue)
    dispatch(setTrainSchedules(items))
  }
  useEffect(() => {
    async function getAll(): Promise<void> {
      const items = await getAllTrainSchedules(inputValue)
      dispatch(setTrainSchedules(items))
    }
    getAll()
  }, [state.isAuth])

  if (!state.isAuth) {
    return <AuthModal />
  }
  return (
    <>
      <Typography sx={{ textAlign: 'center', marginBottom: '50px' }}>
        You're connected as <b>{state.username}</b>
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          sx={{ marginBottom: '30px' }}
          variant="outlined"
          color="secondary"
          onClick={handleCreateModalOpen}
        >
          New Schedule
        </Button>
      </Box>
      <CreateModal title='Create' isOpenModal={isCreateModalOpen} setModalOpen={setCreateModalOpen} getAllValues={createTrainSchedule} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        // minHeight="100vh"
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
          <SortBySelect sortBy={sortBy} setSortBy={setSortBy} />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <TrainScheduleList handleDelete={deleteTrainSchedule} handleUpdate={handleCurrentTrainScheduleId} trainSchedules={state.trainSchedulesItems} />
      </Box>
    </>
  )
}

export default App
