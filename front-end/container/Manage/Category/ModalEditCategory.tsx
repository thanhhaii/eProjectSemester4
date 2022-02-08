import ButtonLoading from "components/ButtonLoading"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { Category } from "models/Categorym"
import { useCallback, useMemo } from "react"
import { Modal } from "react-bootstrap"
import * as yup from "yup"

export interface ModalEditCategoryProps {
  show: boolean
  onHide: () => void
  category?: Category
  onUpdateCategory: (values: Category, categoryID: number) => Promise<void>
  onCreateCategory: (values: Category) => Promise<void>
}

const validation = (): yup.ObjectSchema<any> =>
  yup.object().shape({
    categoryName: yup.string().required("Category name can't be blank"),
    description: yup.string().required("Description can't be blank"),
  })

const ModalEditCategory = (props: ModalEditCategoryProps) => {
  const { show, onHide, category, onUpdateCategory, onCreateCategory } = props

  const initialValue = useMemo(() => {
    return {
      categoryName: category ? category.categoryName : "",
      description: category ? category.description : "",
      isShow: category ? category.isShow : true,
    } as Category
  }, [category])

  const handleSubmit = useCallback(
    async (values: Category, { setSubmitting }) => {
      setSubmitting(true)
      if (category) {
        await onUpdateCategory(values, category.id)
      } else {
        await onCreateCategory(values)
      }
      setSubmitting(false)
      onHide()
    },
    [category, onHide, onUpdateCategory, onCreateCategory],
  )

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body>
        <Formik
          initialValues={initialValue}
          enableReinitialize
          validationSchema={validation}
          onSubmit={handleSubmit}>
          {formik => {
            return (
              <Form>
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="categoryName" className="form-label small">
                      Category Name
                    </label>
                    <Field
                      type="text"
                      className="form-control"
                      id="categoryName"
                      name="categoryName"
                    />
                    <p className="small text-danger">
                      <ErrorMessage name="categoryName" />
                    </p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label small">
                      Description
                    </label>
                    <Field
                      as="textarea"
                      rows="4"
                      className="form-control"
                      id="description"
                      name="description"
                    />
                    <p className="small text-danger">
                      <ErrorMessage name="description" />
                    </p>
                  </div>
                </div>
                {category && (
                  <div className="col-12 mb-3">
                    <div className="form-check">
                      <Field
                        name="isShow"
                        className="form-check-input bg-dark border-dark"
                        type="checkbox"
                        id="isShow"
                      />
                      <label className="form-check-label" htmlFor="isShow">
                        Show category
                      </label>
                    </div>
                  </div>
                )}
                <div className="col-12">
                  <div className="row">
                    <div className="col-6">
                      <button
                        className="btn btn-light w-100"
                        type="button"
                        onClick={onHide}>
                        Cancel
                      </button>
                    </div>
                    <div className="col-6">
                      <ButtonLoading
                        isLoading={formik.isSubmitting}
                        className="btn btn-dark w-100"
                        type="submit">
                        {category ? "Update category" : "Create category"}
                      </ButtonLoading>
                    </div>
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}
export default ModalEditCategory
