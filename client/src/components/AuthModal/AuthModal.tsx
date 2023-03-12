import { useState } from 'react'

import {
  Modal as ModalMenu,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material'

import { setUser } from '../../providers/reducer'
import { useAppContext } from '../../providers/context'

import styles from './AuthModal.styles'
import { saveToStorage } from '../../utils/localStorage'

export const AuthModal = (): JSX.Element => {
  const [username, setUsername] = useState<string>('')
  const { state, dispatch } = useAppContext()
  const loginUser = () => {
    if (username.length) {
      dispatch(setUser(username))
      saveToStorage('username', username)
      saveToStorage('isAuth', true)
    }
  }
  const onUsernameChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value)
  } 
  return (
    <>
      <ModalMenu
        open={!state.isAuth}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modal}>
          <Typography>Enter your username</Typography>
          <TextField color='secondary' value={username}
            onChange={onUsernameChange} id="standard-basic" label="Username" variant="standard" />
          <Button color='secondary' sx={styles.button} onClick={loginUser} variant='contained'>Login</Button>
        </Box>
      </ModalMenu>
    </>
  )
}
