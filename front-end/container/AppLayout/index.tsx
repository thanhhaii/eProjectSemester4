import React, { ReactNode, useState } from "react"
import HeaderLayout from "../../components/Layout/Header"
import styles from "./AppLayout.module.scss"
import ModalUploadImage from "../../components/Layout/Header/ModalUploadImage"
import SideNav from "../../components/Layout/SideNav"

export interface AppLayoutProps {
  children: ReactNode
}

function AppLayout(props: AppLayoutProps) {
  const [isShowModalAddImage, setShowModalAddImage] = useState<boolean>(false)
  const { children } = props
  return (
    <>
      <HeaderLayout onShowModalUploadImage={() => setShowModalAddImage(true)} />
      <SideNav/>
      <div className={styles.main}>
        {children}
      </div>
      <ModalUploadImage show={isShowModalAddImage} onHide={() => setShowModalAddImage(false)} />
    </>
  )
}

export default AppLayout
