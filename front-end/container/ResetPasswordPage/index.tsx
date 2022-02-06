import React, { useCallback, useMemo, useState } from "react"
import FormUserLayout from "components/Layout/FormUser/FormUserLayout"
import { Formik, Field, Form, ErrorMessage } from "formik"
import { ResetPasswordFormProps } from "models/FormValuem"
import Link from "components/Link"
import pageUrls from "services/pageUrls"
import * as yup from "yup"
import { useRouter } from "next/router"
import serverApi from "../../services/server"
import axios, { AxiosError } from "axios"
import ButtonLoading from "../../components/ButtonLoading"
import ModalSuccess from "../../components/ModalSuccess"
import { useIsomorphicLayoutEffect } from "react-use"

export interface ResetPasswordPageProps {}

const initialValue: ResetPasswordFormProps = {
  newPassword: "",
  confirmPassword: "",
}

const validation = (): yup.ObjectSchema<any> =>
  yup.object().shape({
    newPassword: yup
      .string()
      .min(5, "New password too short")
      .matches(/^(?!.* )/, "Password must not contain spaces")
      .required("New password can't be blank"),
    confirmPassword: yup
      .string()
      .min(5, "Password too short")
      .oneOf(
        [yup.ref("newPassword"), null],
        "Confirm password not match with new password",
      )
      .required("Confirm password can't be blank"),
  })

function ResetPasswordContainer(props: ResetPasswordPageProps) {
  const [isShowPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isSuccess, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const validationSchema = useMemo(() => validation(), [])
  const router = useRouter()
  const { t } = router.query

  useIsomorphicLayoutEffect(() => {
    if (!router.isReady) {
      return
    }
    if (!t) {
      router.replace(pageUrls.home)
    }
  }, [router.isReady, t])

  const handleSubmit = useCallback(
    async (values: ResetPasswordFormProps) => {
      try {
        if (!t) {
          return
        }
        setLoading(true)
        setError("")
        await serverApi.resetPassword({
          token: t.toString(),
          newPassword: values.newPassword,
        })
        setSuccess(true)
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const error = e as AxiosError
          if (error.response?.data.message) {
            setError(error.response?.data.message)
          } else {
            setError("Internal server error")
          }
        }
      }
      setLoading(false)
    },
    [t],
  )

  const handleTimeOut = useCallback(async () => {
    await router.replace(pageUrls.loginPage)
  }, [router])

  return (
    <FormUserLayout>
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {formik => {
          return (
            <Form className="row justify-content-center h-100 align-items-center">
              <div className="col-8">
                <div className="row">
                  <div className="col-12">
                    <h1>Reset Password</h1>
                    <p className="gray-600">
                      Enter new password and then repeat it
                    </p>
                    <hr className="my-3" />
                  </div>
                  <div className="col-12">
                    {error !== "" && (
                      <p className="text-danger mb-1">{error}</p>
                    )}
                    <label htmlFor="newPassword" className="form-label">
                      New Password
                    </label>
                    <Field
                      type={isShowPassword ? "text" : "password"}
                      className="form-control fw-light"
                      placeholder="New Password"
                      id="newPassword"
                      name="newPassword"
                    />
                    <span className="text-danger">
                      <ErrorMessage name="newPassword" />
                    </span>
                  </div>
                  <div className="col-12 mt-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <Field
                      type={isShowPassword ? "text" : "password"}
                      className="form-control fw-light"
                      placeholder="Confirm Password"
                      id="confirmPassword"
                      name="confirmPassword"
                    />
                    <span className="text-danger">
                      <ErrorMessage name="confirmPassword" />
                    </span>
                  </div>
                  <div className="col-12 my-3 d-flex justify-content-between">
                    <div>
                      <input
                        type="checkbox"
                        id="showPassword"
                        className="form-check-input me-2"
                        checked={isShowPassword}
                        onChange={e => setShowPassword(e.target.checked)}
                      />
                      <label htmlFor="showPassword" className="form-label">
                        Show password
                      </label>
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <ButtonLoading
                      isLoading={isLoading}
                      className="btn btn-primary w-100"
                      type="submit">
                      Reset Password
                    </ButtonLoading>
                  </div>
                  <div className="col-12 text-center">
                    <Link
                      href={pageUrls.registerPage}
                      className="fw-bold small">
                      Back to login
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
      <ModalSuccess
        content="Reset password success, you can use a new password to log in and use all features!"
        show={isSuccess}
        onHide={() => {}}
        onTimeOut={handleTimeOut}
        time={5}
      />
    </FormUserLayout>
  )
}

export default ResetPasswordContainer
