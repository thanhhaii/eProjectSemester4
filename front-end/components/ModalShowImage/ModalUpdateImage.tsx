import ButtonLoading from "components/ButtonLoading"
import FieldSelectCategory, {
  SelecteCategoryProps,
} from "components/FieldSelectCategory"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Category } from "models/Categorym"
import { UpdateImageInfo } from "models/FormValuem"
import { ImageItem } from "models/Imagem"
import Image from "next/image"
import { useCallback, useMemo } from "react"
import { Modal } from "react-bootstrap"
import styles from "./ModalShowImage.module.scss"

export interface ModalUpdateImageProps {
  show: boolean
  onHide: () => void
  imageItem: ImageItem
  categories: Category[]
  onUpdateImage: (values: UpdateImageInfo, imageId: string) => Promise<void>
}

const ModalUpdateImage = (props: ModalUpdateImageProps) => {
  const { show, onHide, imageItem, categories, onUpdateImage } = props

  const initialValues = useMemo(() => {
    const category: number[] = []

    categories.forEach(item => {
      if (imageItem.categories.includes(item.categoryName)) {
        category.push(item.id)
      }
    })

    return {
      categories: imageItem.categories || [],
      description: imageItem.imageInfo?.description || "",
      title: imageItem.imageInfo?.title || "",
      categoryIDs: category || [],
    } as UpdateImageInfo
  }, [categories, imageItem])

  const handleUpdate = useCallback(
    async (values: UpdateImageInfo, { setSubmitting }) => {
      setSubmitting(true)
      await onUpdateImage(values, imageItem.id)
      setSubmitting(false)
      onHide()
    },
    [imageItem.id, onHide, onUpdateImage],
  )

  return (
    <Modal
      centered
      show={show}
      onHide={onHide}
      size="lg"
      contentClassName={styles.modalBorder}
      backdropClassName={styles.blurBg}>
      <Modal.Body className={styles.modalUpdateImage}>
        <div className="row h-100">
          <div className="col-5">
            <div className="position-relative h-100">
              <Image
                src={imageItem.imageUrl}
                alt="image item"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="col-7 ps-0 h-100 d-flex align-items-center">
            <Formik
              initialValues={initialValues}
              onSubmit={handleUpdate}
              enableReinitialize>
              {formik => {
                return (
                  <Form className="p-4">
                    <div className="row">
                      <div className="col-12">
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label small">
                            Title
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                          />
                          <p className="small text-danger mb-0">
                            <ErrorMessage name="title" />
                          </p>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-3">
                          <label
                            htmlFor="description"
                            className="form-label small">
                            Category
                          </label>
                          <FieldSelectCategory
                            categories={categories}
                            defaultValues={() => {
                              const values: SelecteCategoryProps[] = []
                              categories.forEach(category => {
                                if (
                                  formik.values.categories.includes(
                                    category.categoryName,
                                  )
                                ) {
                                  values.push({
                                    label: category.categoryName,
                                    value: category,
                                  } as SelecteCategoryProps)
                                }
                              })
                              return values
                            }}
                            onSelectCategory={(categoryIDs: number[]) => {
                              console.log(categoryIDs)
                              formik.setFieldValue("categoryIDs", categoryIDs)
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-3">
                          <label
                            htmlFor="description"
                            className="form-label small">
                            Description
                          </label>
                          <Field
                            type="text"
                            as="textarea"
                            className="form-control"
                            id="description"
                            name="description"
                          />
                          <p className="small text-danger mb-0">
                            <ErrorMessage name="description" />
                          </p>
                        </div>
                      </div>
                      <div className="col-12 mt-4">
                        <ButtonLoading
                          isLoading={formik.isSubmitting}
                          className="btn btn-dark w-100"
                          type="submit">
                          Update image
                        </ButtonLoading>
                      </div>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default ModalUpdateImage
