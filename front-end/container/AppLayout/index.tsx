import React, { ReactNode, useState } from "react"
import HeaderLayout from "../../components/Layout/Header"
import styles from "./AppLayout.module.scss"
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
      <SideNav />
      <div className={styles.main}>{children}</div>
    </>
  )
}

export default AppLayout
