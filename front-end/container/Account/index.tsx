import NoUserImage from "public/images/noUser.png"
import Image from "next/image"
import { useCallback, useEffect, useMemo, useState } from "react"
import { UpdateUserProfile } from "models/FormValuem"
import { useFormik } from "formik"
import ButtonLoading from "components/ButtonLoading"
import { useDropzone } from "react-dropzone"
import classNames from "classnames"
import styles from "./UpdateAccount.module.scss"
import serverApi from "services/server"
import { useAppDispatch, useUser } from "state/hooks"
import AccountLayout from "components/Layout/Account"
import { useRouter } from "next/router"
import { userIdentified } from "state/userSlice"

export interface AccountContainerProps {}

const AccountContainer = (props: AccountContainerProps) => {
  const user = useUser()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const initialValues = useMemo(() => {
    return {
      firstName: user?.profile?.firstName || "",
      lastName: user?.profile?.lastName || "",
      phone: user?.profile?.phone || 0,
      avatar: user?.profile?.avatar,
      location: user?.about?.location || "",
      bio: user?.about?.bio || "",
    } as UpdateUserProfile
  }, [user])

  const [isUploadingAvatar, setUploadingAvatar] = useState<boolean>(false)
  const [avatarUrlTemp, setAvatarUrlTemp] = useState<string>()

  useEffect(() => {
    if (!avatarUrlTemp) {
      return
    }

    return () => {
      URL.revokeObjectURL(avatarUrlTemp)
    }
  }, [avatarUrlTemp])

  const handleSubmit = useCallback(
    async (values: UpdateUserProfile) => {
      await serverApi.updateUserProfile(
        {
          avatar: values.avatar,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
        },
        {
          bio: values.bio,
          location: values.location,
        },
      )
      const user = await serverApi.getMe()
      dispatch(userIdentified(user))
    },
    [dispatch],
  )

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  })

  const handleDropAccepted = useCallback(
    async (files: File[]) => {
      setUploadingAvatar(true)
      setAvatarUrlTemp(URL.createObjectURL(files[0]))
      const resp = await serverApi.uploadImage(files[0])
      formik.setFieldValue("avatar", resp.url)
      setUploadingAvatar(false)
    },
    [formik],
  )

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxFiles: 1,
    onDropAccepted: handleDropAccepted,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <AccountLayout pathName={router.pathname}>
        <div className="row">
          <div className="col-12 mb-3">
            <h5 className="fw-bold">Edit profile</h5>
          </div>
          <div className="col-4">
            <div className="text-center">
              <div
                {...getRootProps({
                  className: classNames(
                    "position-relative",
                    styles.boxUpdateAvatar,
                  ),
                })}>
                <Image
                  src={formik.values.avatar || NoUserImage}
                  alt="avatar user"
                  width={120}
                  height={120}
                  className="rounded-circle"
                  objectFit="cover"
                />
                <input
                  {...getInputProps({ className: "d-none" })}
                  disabled={isUploadingAvatar}
                />
                <p className="small mt-2">Change profile image</p>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label small">
                    First Name
                  </label>
                  <input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    className="form-control"
                    id="firstName"
                    name="firstName"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label small">
                    Last Name
                  </label>
                  <input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    className="form-control"
                    id="lastName"
                    name="lastName"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label small">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    type="number"
                    className="form-control"
                    id="phone"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-4">
            <h5 className="fw-bold">About</h5>
          </div>
          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="Location" className="form-label small">
                Location
              </label>
              <input
                onChange={formik.handleChange}
                value={formik.values.location}
                type="text"
                className="form-control"
                id="Location"
                name="location"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="bio" className="form-label small">
                Bio
              </label>
              <textarea
                className="form-control"
                id="bio"
                onChange={formik.handleChange}
                value={formik.values.bio}
                name="bio"
                rows={3}
              />
            </div>
          </div>
          <div className="col-12 pt-3">
            <ButtonLoading
              isLoading={formik.isSubmitting || isUploadingAvatar}
              disabled={
                formik.isSubmitting || !formik.isValid || isUploadingAvatar
              }
              className="btn btn-dark w-100"
              type="submit">
              Update account
            </ButtonLoading>
          </div>
        </div>
      </AccountLayout>
    </form>
  )
}
export default AccountContainer
