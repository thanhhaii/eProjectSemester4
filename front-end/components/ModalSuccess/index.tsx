import { Modal } from "react-bootstrap"
import Link from "../Link"
import pageUrls from "services/pageUrls"
import Image from "next/image"
import classNames from "classnames"
import styles from "./ModalSuccess.module.scss"
import { useCallback, useEffect, useState } from "react"

export interface ModalSuccessProps {
  show: boolean
  onHide: () => void
  content?: string
  onTimeOut?: () => void
  time?: number
}

export default function ModalSuccess(props: ModalSuccessProps) {
  const { show, onHide, content, time, onTimeOut } = props
  const [timeOut, setTimeOut] = useState<number | undefined>(time)

  const handleTimeOut = useCallback(() => {
    setTimeOut(state => {
      if (!state) {
        return state
      }
      return state - 1
    })
  }, [])

  useEffect(() => {
    if (!time || !onTimeOut) {
      return
    }

    if (timeOut === 0) {
      onTimeOut()
      return
    }

    const t = setInterval(handleTimeOut, 1000)
    return () => {
      clearInterval(t)
    }
  }, [handleTimeOut, onTimeOut, time])

  return <Modal show={show} onHide={onHide} centered>
    <Modal.Body>
      <div className="row justify-content-center">
        <div className="col-3 mb-3">
          <div className={classNames("position-relative", styles.boxImage)}>
            <Image
              src="/images/tick.png"
              alt="success"
              objectFit="cover"
              layout="fill"
            />
          </div>
        </div>
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Reset Password Success</h5>
        </div>
        <div className="col-12">
          <p>{content}&nbsp;{time && <span>Redirect after
            <span className="text-danger">
            {timeOut}
          </span> second!</span>}</p>
        </div>
        <div className="col-12 text-center">
          <Link href={pageUrls.loginPage} className="btn btn-primary">
            Go to login!
          </Link>
        </div>
      </div>
    </Modal.Body>
  </Modal>
}
