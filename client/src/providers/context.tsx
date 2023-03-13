import React, { ChildContextProvider, createContext, Reducer, useContext, useReducer } from "react";
import { initialState, initialStateType } from "./initialState";
import reducer, { ActionsType } from "./reducer";
import { ActionTypes } from '@mui/base';

interface Children {children:JSX.Element}

const AppContext = createContext({state:initialState, dispatch:'' as any})

export const ContextProvider = ({children}:Children) => {
    const [state, dispatch] = useReducer(reducer as Reducer<initialStateType, ActionsType>, initialState as initialStateType)
    const value = {state,dispatch}
    return <AppContext.Provider value={value} >{children}</AppContext.Provider>
}

export const useAppContext = () => {
    const {state,dispatch} = useContext(AppContext)
    return {state,dispatch}
}