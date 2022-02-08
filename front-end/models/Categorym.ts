export interface Category {
  id: number
  isShow: boolean
  categoryName: string
  description?: string
  createdAt?: string
  updatedAt?: string
}
export interface CategoryTypeAhead
  extends Omit<Category, "description" | "createdAt" | "updatedAt"> {}
