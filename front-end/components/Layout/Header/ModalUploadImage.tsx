import Modal from "react-bootstrap/Modal"

export interface ModalUploadImageProps {
  show: boolean
  onHide: () => void
}

function ModalUploadImage(props: ModalUploadImageProps) {
  const { show, onHide } = props

  return <Modal show={show} onHide={onHide} centered size="xl" className="">
    <Modal.Body>

    </Modal.Body>
  </Modal>
}

export default ModalUploadImage
