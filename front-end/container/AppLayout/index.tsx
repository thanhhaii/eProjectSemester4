import React, { ReactNode, useCallback, useState } from "react"
import HeaderLayout from "../../components/Layout/Header"
import styles from "./AppLayout.module.scss"
import SideNav from "../../components/Layout/SideNav"
import dynamic from "next/dynamic"
import { ImageRef } from "models/Imagem"
import serverApi from "services/server"
import { useCategory } from "state/hooks"
import { UploadImageFormProps } from "models/FormValuem"

const ModalAddImage = dynamic(() => import("components/ModalUploadImage"), {
  ssr: false,
})

export interface AppLayoutProps {
  children: ReactNode
}

function AppLayout(props: AppLayoutProps) {
  const [isShowModalAddImage, setShowModalAddImage] = useState<boolean>(false)
  const { children } = props
  const categories = useCategory()

  const handleUploadImage = useCallback(
    async (file: File): Promise<ImageRef> => {
      return await serverApi.uploadImage(file)
    },
    [],
  )

  const handleSaveImage = useCallback(
    async (values: UploadImageFormProps): Promise<void> => {
      await Promise.all(
        values.images.map(async item => {
          if (!item.fileID) {
            return
          }
          await serverApi.addImageToCategory({
            imageID: item.fileID,
            categoryIDs: item.categories || [],
          })
          serverApi.updateImageInfo(
            {
              description: item.description || "",
              categoryIDs: item.categories || [],
              title: item.title || "",
            },
            item.fileID,
          )
        }),
      )
    },
    [],
  )

  return (
    <>
      <HeaderLayout
        onShowModalUploadImage={() => setShowModalAddImage(true)}
        categories={categories}
      />
      <SideNav />
      <div className={styles.main}>{children}</div>
      <ModalAddImage
        onSubmit={handleSaveImage}
        onUploadImage={handleUploadImage}
        show={isShowModalAddImage}
        onHide={() => setShowModalAddImage(false)}
      />
    </>
  )
}

export default AppLayout
