import { Category } from "models/Categorym"
import { useCallback, useMemo, useState } from "react"
import Select, { InputActionMeta } from "react-select"
import makeAnimated from "react-select/animated"

const animatedComponents = makeAnimated()

export interface FieldSelectCategoryProps {
  categories: Category[]
  onSelectCategory: (categoryIDs: number[]) => void
}

export interface SelecteCategoryProps {
  label: string
  value: Category
}

const FieldSelectCategory = (props: FieldSelectCategoryProps) => {
  const { categories, onSelectCategory } = props
  const [categoriesSelected, setCategoriesSelected] = useState<
    SelecteCategoryProps[]
  >([])

  const options = useMemo(() => {
    return categories.map(category => {
      return {
        label: category.categoryName,
        value: category,
      } as SelecteCategoryProps
    })
  }, [categories])

  const handleInputChange = useCallback(
    (newValue: string, actionMeta: InputActionMeta) => {},
    [],
  )

  const handleOnChange = useCallback(
    (newValue: any) => {
      setCategoriesSelected(newValue)
      onSelectCategory(
        newValue.map((item: SelecteCategoryProps) => item.value.id),
      )
    },
    [onSelectCategory],
  )

  return (
    <Select
      components={animatedComponents}
      closeMenuOnSelect={false}
      options={options}
      isMulti
      name="colors"
      className="form-control-sm p-0"
      onInputChange={handleInputChange}
      onMenuOpen={() => {}}
      value={categoriesSelected}
      placeholder={"Select category"}
      onChange={handleOnChange}
      onMenuClose={() => {}}
    />
  )
}
export default FieldSelectCategory
