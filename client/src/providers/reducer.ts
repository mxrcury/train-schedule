import axios from "axios";
import { TrainSchedule, TrainScheduleOptional } from "../types/trainSchedule.type";
import { initialStateType } from "./initialState";

const SET_USER = 'SET_USER'
const SET_TRAIN_SCHEDULES = 'SET_TRAIN_SCHEDULES'
const SET_CURRENT_TRAIN_SCHEDULES_ID = 'SET_CURRENT_TRAIN_SCHEDULES_ID'
const DELETE_TRAIN_SCHEDULE = 'DELETE_TRAIN_SCHEDULE'
const UPDATE_TRAIN_SCHEDULE = 'UPDATE_TRAIN_SCHEDULE'
const ADD_TRAIN_SCHEDULE = 'ADD_TRAIN_SCHEDULE'

export default (state: initialStateType, action: ActionsType) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, isAuth: true, username: action.payload }
        case SET_TRAIN_SCHEDULES:
            return { ...state, trainSchedulesItems: action.payload }
        case SET_CURRENT_TRAIN_SCHEDULES_ID:
            return {...state, currentTrainScheduleId:action.payload}
        case ADD_TRAIN_SCHEDULE:
            return {...state,trainSchedulesItems:[...state.trainSchedulesItems, action.payload]}
        case DELETE_TRAIN_SCHEDULE:
            return {...state, trainSchedulesItems:state.trainSchedulesItems.filter(item => item._id !== action.payload)}
        case UPDATE_TRAIN_SCHEDULE:
            return {...state,trainSchedulesItems:state.trainSchedulesItems.map(item => {
                if(item._id ===  state.currentTrainScheduleId) {
                    return {...item, ...action.payload as TrainScheduleOptional}
                }
                return item
            })}
        default:
            return state
    }
}

export const setUser = (username: string) => ({ type: SET_USER, payload: username })
export const setTrainSchedules = (items: TrainSchedule[]) => ({ type: SET_TRAIN_SCHEDULES, payload: items })
export const setCurrentTrainScheduleId = (id:string) => ({type:SET_CURRENT_TRAIN_SCHEDULES_ID, payload:id})
export const deleteTrainScheduleById = (id:string) => ({type:DELETE_TRAIN_SCHEDULE, payload: id})
export const addTrainSchedule = (trainSchedule:TrainSchedule) => ({type:ADD_TRAIN_SCHEDULE, payload: trainSchedule})
export const updateTrainScheduleById = (updates:TrainScheduleOptional) => ({type:UPDATE_TRAIN_SCHEDULE, payload: updates})

export const getAllTrainSchedules = async ({text, sortBy}:{text?:string, sortBy: 'price' | 'date' | ''}) => {
    const { data } = await axios.get<TrainSchedule[]>(`http://localhost:3000/train-schedule?search=${text}&sortBy=${sortBy}`)
    return data
}

export type ActionsType = ReturnType<typeof setUser> | ReturnType<typeof setTrainSchedules> | ReturnType<typeof deleteTrainScheduleById> | ReturnType<typeof setCurrentTrainScheduleId> | ReturnType<typeof updateTrainScheduleById>