import { Formik, Form, FieldArray } from "formik"
import { UploadImageFormProps } from "models/FormValuem"
import { useCallback, useMemo, useState } from "react"
import Modal from "react-bootstrap/Modal"
import { useDropzone } from "react-dropzone"
import styles from "./ModalUploadImage.module.scss"
import Image from "next/image"
import ImagePhoto from "public/images/uploadimage.png"
import FieldArrayImageUpload from "./FieldArrayImageUpload"
import { ImageRef } from "models/Imagem"
import { useCategory } from "state/hooks"
import validation from "./Validation"
import ButtonLoading from "components/ButtonLoading"

export interface ModalUploadImageProps {
  show: boolean
  onHide: () => void
  onUploadImage: (file: File) => Promise<ImageRef>
  onSubmit: (values: UploadImageFormProps) => Promise<void>
}

const initialValues = {
  images: [],
} as UploadImageFormProps

const ModalUploadImage = (props: ModalUploadImageProps) => {
  const { show, onHide, onUploadImage, onSubmit } = props
  const [imageSelected, setImageSelected] = useState<File[]>([])
  const categories = useCategory()
  const validationSchema = useMemo(() => validation(), [])
  const [isLoading, setLoading] = useState<boolean>(false)

  const handleSubmit = useCallback(
    (values: UploadImageFormProps, { resetForm }) => {
      setLoading(true)
      onSubmit(values)
      setImageSelected([])
      setLoading(false)
      resetForm()
      onHide()
    },
    [onHide, onSubmit],
  )

  const handleDropAccepted = useCallback((files: File[]) => {
    setImageSelected(files)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 3,
    onDropAccepted: handleDropAccepted,
  })

  const handleHide = useCallback(() => {
    setImageSelected([])
    onHide()
  }, [onHide])

  const handleUploadImage = useCallback(
    async (file: File): Promise<ImageRef> => {
      setLoading(true)
      const resp = await onUploadImage(file)
      setLoading(false)
      return resp
    },
    [onUploadImage],
  )

  return (
    <Modal show={show} onHide={handleHide} centered size="xl">
      <Modal.Body className={styles.modalUploadImage}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          {formik => {
            return (
              <Form className="row flex-column h-100" id="formUploadImage">
                <div className="col-auto">
                  <p className="h6">Share image to people!</p>
                  <hr />
                </div>
                <div className="col">
                  {imageSelected.length === 0 ? (
                    <div {...getRootProps()} className={styles.uploadImageBox}>
                      <input type="file" {...getInputProps()} />
                      <div className="position-relative">
                        <Image
                          alt="image uploade"
                          src={ImagePhoto}
                          width={64}
                          height={64}
                        />
                      </div>
                      <h3 className="w-50 text-center">
                        Drag and drop up to 3 images
                      </h3>
                    </div>
                  ) : (
                    <div className={styles.boxUploadImageSelected}>
                      <FieldArray
                        name="images"
                        render={props => (
                          <FieldArrayImageUpload
                            {...props}
                            categories={categories}
                            imageSelected={imageSelected}
                            onClearFile={() => setImageSelected([])}
                            onUploadImage={handleUploadImage}
                          />
                        )}
                      />
                    </div>
                  )}
                </div>
              </Form>
            )
          }}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <div className="text-end d-flex">
          <button
            className="btn btn-light me-2"
            type="button"
            onClick={handleHide}>
            Cancel
          </button>
          <ButtonLoading
            isLoading={isLoading}
            className="btn btn-primary"
            type="submit"
            form="formUploadImage">
            Submit
          </ButtonLoading>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
export default ModalUploadImage
