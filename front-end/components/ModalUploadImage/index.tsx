import Modal from "react-bootstrap/Modal"

export interface ModalUploadImageProps {
  show: boolean
  onHide: () => void
}

const ModalUploadImage = (props: ModalUploadImageProps) => {
  const { show, onHide } = props

  return <Modal show={show} onHide={onHide} centered>
    <Modal.Body>
      
    </Modal.Body>
  </Modal>
}
export default ModalUploadImage
