import { User } from "models/Userm"
import { Action, ThunkAction } from "@reduxjs/toolkit"
import { Category } from "models/Categorym"

export interface UserState {
  value: User | null
}

export interface CategoryState {
  categories: Category[]
}

export interface AppState {
  user: UserState
  category: CategoryState
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<String>
>
