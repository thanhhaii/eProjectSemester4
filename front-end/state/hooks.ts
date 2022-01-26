import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "./store"
import { AppState } from "./models"
import { User } from "models/Userm"
import { selectUser } from "./userSlice"
import { Category } from "models/Categorym"
import { selectCategories } from "./categorySlice"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const useUser = (): User | null => {
  return useAppSelector(selectUser)
}

export const useCategory = (): Category[] => {
  return useAppSelector(selectCategories)
}
