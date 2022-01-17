import React, { ReactNode } from "react"
import classNames from "classnames"
import styles from "./FormUserLayout.module.scss"
import Image from "next/image"
import ImageLogin from "public/images/login.jpg"

export interface FormUserLayoutProps {
  children?: ReactNode
}

function FormUserLayout(props: FormUserLayoutProps) {
  const { children } = props

  return (
    <div className={classNames("container", styles.container)}>
      <div className="row h-100 w-100 align-items-center justify-content-center">
        <div className={classNames("col-12 shadow-lg ps-0 bg-white", styles.formLayout)}>
          <div className="row">
            <div className={classNames("col-7", styles.box)}>
              <div className={classNames(styles.boxImage, "position-relative")}>
                <Image
                  src={ImageLogin}
                  alt="image login"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className="col-5 p-2">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormUserLayout
