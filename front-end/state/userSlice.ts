import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../models/User"
import { AppState, UserState } from "./models"

const initialState: UserState = {
  value: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    userIdentified: (_, action: PayloadAction<User | null>) => {
      return {
        value: action.payload,
      }
    },
  },
})

export const { userIdentified } = userSlice.actions

export const selectUserState = (state: AppState) => state.user

export const selectUser = createSelector(selectUserState, userState => userState.value)

export default userSlice.reducer
