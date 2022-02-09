import { useCallback, useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { useAppDispatch, useAppSelector, useCategory } from "state/hooks"
import styles from "./ManageCategory.module.scss"
import { Category } from "models/Categorym"
import ModalEditCategory from "./ModalEditCategory"
import serverApi from "services/server"
import { setCategory } from "state/categorySlice"
import { isAdminOrMod } from "state/userSlice"
import { useRouter } from "next/router"
import pageUrls from "services/pageUrls"

export interface ManageCategoryContainerProps {}

const ManageCategoryContainer = (props: ManageCategoryContainerProps) => {
  const categoriesList = useCategory()
  const [categories, setCategories] = useState<Category[]>(categoriesList)
  const [keyword, setKeyword] = useState<string>("")
  const [categoryTarget, setCategoryTarget] = useState<Category | undefined>()
  const [isShowModalEdit, setShowModalEdit] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const isManage = useAppSelector(isAdminOrMod)
  const router = useRouter()

  useEffect(() => {
    if (!isManage) {
      router.push(pageUrls.notFound)
    }
  }, [isManage, router])

  useEffect(() => {
    setCategories(categoriesList)
  }, [categoriesList])

  const handleSearchCategory = useCallback(
    e => {
      const keyword = e.target.value
      setKeyword(keyword)
      setCategories(
        categoriesList.filter(
          category =>
            category.categoryName
              .toLowerCase()
              .includes(keyword.toLowerCase()) ||
            category.description?.toLowerCase().includes(keyword.toLowerCase()),
        ),
      )
    },
    [categoriesList],
  )

  const handleEditCategory = useCallback((category: Category) => {
    setCategoryTarget(category)
    setShowModalEdit(true)
  }, [])

  const handleClickCreateCategory = useCallback(() => {
    setCategoryTarget(undefined)
    setShowModalEdit(true)
  }, [])

  const handleUpdateCategory = useCallback(
    async (category: Category, categoryID: number) => {
      await serverApi.updateCategory({
        categoryName: category.categoryName,
        description: category.description || "",
        id: categoryID,
        isShow: category.isShow,
      })
      const categories = await serverApi.getAllCategory()
      dispatch(setCategory(categories))
    },
    [dispatch],
  )

  const handleCreateCategory = useCallback(
    async (category: Category) => {
      await serverApi.createCategory({
        categoryName: category.categoryName,
        description: category.description || "",
      })
      const categories = await serverApi.getAllCategory()
      dispatch(setCategory(categories))
    },
    [dispatch],
  )

  return (
    <div className="container pt-5">
      <div className="row mb-3">
        <div className="col-10">
          <input
            type="text"
            className="form-control"
            value={keyword}
            placeholder="Search category"
            onChange={handleSearchCategory}
          />
        </div>
        <div className="col-2">
          <button
            className="btn btn-dark w-100 h-100"
            type="button"
            onClick={handleClickCreateCategory}>
            Create category
          </button>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th style={{ whiteSpace: "nowrap" }}>Category Name</th>
            <th>Description</th>
            <th>Show</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => {
            return (
              <tr
                key={index}
                className={styles.item}
                onClick={() => handleEditCategory(category)}>
                <td>{index + 1}</td>
                <td>{category.categoryName}</td>
                <td>{category.description}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={category.isShow}
                    className="form-check-input bg-dark border-dark"
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <ModalEditCategory
        category={categoryTarget}
        show={isShowModalEdit}
        onHide={() => setShowModalEdit(false)}
        onUpdateCategory={handleUpdateCategory}
        onCreateCategory={handleCreateCategory}
      />
    </div>
  )
}
export default ManageCategoryContainer
