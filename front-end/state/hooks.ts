import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "./store"
import { AppState } from "./models"
import { User } from "../models/User"
import { selectUser } from "./userSlice"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const useUser = (): User | null => {
  return useAppSelector(selectUser)
}
