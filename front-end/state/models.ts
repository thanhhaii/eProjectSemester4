import { User } from "models/User"
import { Action, ThunkAction } from "@reduxjs/toolkit"


export interface UserState {
  value: User | null
}

export interface AppState {
  user: UserState
}

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<String>>
