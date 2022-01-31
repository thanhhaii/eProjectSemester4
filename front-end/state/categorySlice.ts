import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Category } from "models/Categorym"
import { AppState, CategoryState } from "./models"

const initialState: CategoryState = {
  categories: [],
}

export const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    setCategory: (_, action: PayloadAction<Category[]>) => {
      return {
        categories: action.payload,
      }
    },
  },
})

export const { setCategory } = categorySlice.actions

export const selectCategoryState = (state: AppState) => state.category

export const selectCategories = createSelector(
  selectCategoryState,
  categories => categories.categories,
)

export const selectListNameCategory = createSelector(
  selectCategoryState,
  categories => categories.categories.map(category => category.categoryName),
)

export default categorySlice.reducer
