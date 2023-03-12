import axios from "axios";
import { ReducerAction, Reducer } from "react";
import { TrainSchedule } from "../types/trainSchedule.type";
import { initialStateType } from "./initialState";

const SET_USER = 'SET_USER'
const SET_TRAIN_SCHEDULES = 'SET_TRAIN_SCHEDULES'
const SET_CURRENT_TRAIN_SCHEDULES_ID = 'SET_CURRENT_TRAIN_SCHEDULES_ID'
const DELETE_TRAIN_SCHEDULE_BY_ID = 'DELETE_TRAIN_SCHEDULE_BY_ID'

export default (state: initialStateType, action: ActionsType) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, isAuth: true, username: action.payload }
        case SET_TRAIN_SCHEDULES:
            return { ...state, trainSchedulesItems: action.payload }
        case SET_CURRENT_TRAIN_SCHEDULES_ID:
            return {...state, currentTrainScheduleId:action.payload}
        case DELETE_TRAIN_SCHEDULE_BY_ID:
            return {...state, trainSchedulesItems:state.trainSchedulesItems.filter(item => item._id !== action.payload)}
        default:
            return state
    }
}

export const setUser = (username: string) => ({ type: SET_USER, payload: username })
export const setTrainSchedules = (items: TrainSchedule[]) => ({ type: SET_TRAIN_SCHEDULES, payload: items })
export const setCurrentTrainScheduleId = (id:string) => ({type:SET_CURRENT_TRAIN_SCHEDULES_ID, payload:id})
export const deleteTrainScheduleById = (id:string) => ({type:DELETE_TRAIN_SCHEDULE_BY_ID, payload: id})

export const getAllTrainSchedules = async (text?:string) => {
    const { data } = await axios.get<TrainSchedule[]>(`http://localhost:3000/train-schedule?search=${text}`)
    console.log(data)
    return data
}

export type ActionsType = ReturnType<typeof setUser> | ReturnType<typeof setTrainSchedules> | ReturnType<typeof setCurrentTrainScheduleId>