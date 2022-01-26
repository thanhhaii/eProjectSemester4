import {
  AnyAction,
  configureStore,
  EnhancedStore,
  ThunkDispatch,
} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import categoryReducer from "./categorySlice"
import { AppState } from "./models"
import { getPublic } from "../services/config"
import { isServer } from "../services/ssrutils"

export function makeStore(preloadedState?: AppState) {
  return configureStore<AppState>({
    devTools: getPublic().envCode !== "production",
    preloadedState,
    reducer: {
      user: userReducer,
      category: categoryReducer,
    },
  })
}

let store: EnhancedStore<AppState>
let cachedPreloadedState: AppState

export function getStore() {
  if (isServer()) {
    const tmp = makeStore(cachedPreloadedState)
    if (!cachedPreloadedState) {
      cachedPreloadedState = tmp.getState()
    }

    return tmp
  }

  if (!store) {
    store = makeStore()
  }

  return store
}

export type AppDispatch = ThunkDispatch<AppState, any, AnyAction>

export default getStore
