import { TrainSchedule } from "../types/trainSchedule.type"
import { getFromStorage } from "../utils/localStorage"

export const initialState =  {
    isAuth:getFromStorage('isAuth') || false,
    username:getFromStorage('username') || '',
    trainSchedulesItems: [] as TrainSchedule[],
    currentTrainScheduleId: ''
}
export type initialStateType = typeof initialState