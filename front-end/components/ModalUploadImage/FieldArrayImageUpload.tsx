import classNames from "classnames"
import { ErrorMessage, Field, FieldArrayRenderProps, FormikProps } from "formik"
import { Category } from "models/Categorym"
import { ImageCategoryInfo, UploadImageFormProps } from "models/FormValuem"
import { ImageRef } from "models/Imagem"
import { useCallback, useEffect, useRef } from "react"
import FieldSelectCategory from "./FieldSelectCategory"
import ImageUploadItem from "./ImageUploadItem"
import styles from "./ModalUploadImage.module.scss"

export interface FieldArrayImageUploadProps extends FieldArrayRenderProps {
  form: FormikProps<UploadImageFormProps>
  imageSelected: File[]
  categories: Category[]
  onClearFile: () => void
  onUploadImage: (file: File) => Promise<ImageRef>
}

const FieldArrayImageUpload = (props: FieldArrayImageUploadProps) => {
  const {
    imageSelected,
    form,
    name,
    categories,
    push,
    replace,
    remove,
    onClearFile,
    onUploadImage,
  } = props
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    form.setFieldValue(
      "images",
      imageSelected.map(
        file =>
          ({
            file,
            title: "",
            description: "",
          } as ImageCategoryInfo),
      ),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpenAddMore = useCallback(() => {
    if (!inputRef.current) {
      return
    }
    inputRef.current.click()
  }, [])

  const onUploadMore = useCallback(
    e => {
      const file = e.target.files[0]
      if (imageSelected.includes(file)) {
        return
      }
      push({
        file,
        title: "",
        description: "",
      } as ImageCategoryInfo)
    },
    [imageSelected, push],
  )

  const handleRemove = useCallback(
    (index: number) => {
      remove(index)
      if (form.values.images.length === 1) {
        onClearFile()
      }
    },
    [form.values.images.length, onClearFile, remove],
  )

  const handleUploaded = useCallback(
    (index: number, imageResponse: ImageRef, item: ImageCategoryInfo) => {
      replace(index, {
        ...item,
        ...imageResponse,
      } as ImageCategoryInfo)
    },
    [replace],
  )

  const handleSelectCategories = useCallback(
    (index: number, categoryIDs: number[], item: ImageCategoryInfo) => {
      replace(index, {
        ...item,
        categories: categoryIDs,
      } as ImageCategoryInfo)
    },
    [replace],
  )

  return (
    <div className="row">
      {form.values.images.map((item, index) => {
        const metaTitle = form.getFieldMeta(`${name}.${index}.title`)
        return (
          <div className="col-4" key={index}>
            <ImageUploadItem
              file={item.file}
              onUploadImage={onUploadImage}
              onUploaded={(imageResponse: ImageRef) => {
                handleUploaded(index, imageResponse, item)
              }}
            />
            <div className="mt-3">
              <Field
                name={`${name}.${index}.title`}
                type="text"
                className={classNames("form-control form-control-sm", {
                  "is-valid": metaTitle.touched && !metaTitle.error,
                  "is-invalid": metaTitle.touched && !!metaTitle.error,
                })}
                placeholder="Title"
              />
              <small className="text-danger">
                <ErrorMessage name={`${name}.${index}.title`} />
              </small>
            </div>
            <div className="mt-3">
              <FieldSelectCategory
                categories={categories}
                onSelectCategory={(categoryIDs: number[]) => {
                  handleSelectCategories(index, categoryIDs, item)
                }}
              />
            </div>
            <div className="mt-3">
              <Field
                name={`${name}.${index}.description`}
                as="textarea"
                className="form-control form-control-sm"
                rows="4"
                placeholder="Description"></Field>
            </div>
            <div className="mt-3">
              <button
                className="btn-danger btn text-light"
                type="button"
                onClick={() => handleRemove(index)}>
                Remove
              </button>
            </div>
          </div>
        )
      })}
      {form.values.images.length < 3 && (
        <div className="col-4">
          <div className={styles.boxUploadMore} onClick={handleOpenAddMore}>
            <input
              type="file"
              className="d-none"
              ref={inputRef}
              accept="image/*"
              onChange={onUploadMore}
            />
            <p className="w-75 h4 text-center">Click to add more one image</p>
          </div>
        </div>
      )}
    </div>
  )
}
export default FieldArrayImageUpload
