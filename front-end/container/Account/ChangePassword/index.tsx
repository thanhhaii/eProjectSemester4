import classNames from "classnames"
import ButtonLoading from "components/ButtonLoading"
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik"
import { ChangePassword } from "models/FormValuem"
import { useRouter } from "next/router"
import { useCallback, useMemo, useState } from "react"
import serverApi from "services/server"
import AccountLayout from "components/Layout/Account"
import * as yup from "yup"

export interface ChangePasswordContainerProps {}

const validation = (): yup.ObjectSchema<any> =>
  yup.object().shape({
    currentPassword: yup.string().required("Current password cannot be blank"),
    newPassword: yup
      .string()
      .min(5, "New password is too short")
      .required("New password cannot be blank"),
    confirmPassword: yup
      .string()
      .min(5, "Confirm password too short")
      .oneOf(
        [yup.ref("newPassword"), null],
        "Confirm password not match with new password",
      )
      .required("Confirm password can't be blank"),
  })

const ChangePasswordContainer = (props: ChangePasswordContainerProps) => {
  const router = useRouter()
  const [success, setSuccess] = useState<boolean | undefined>()

  const initialValues = useMemo(() => {
    return {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    } as ChangePassword
  }, [])

  const handleSubmit = useCallback(
    async (
      values: ChangePassword,
      formikHelper: FormikHelpers<ChangePassword>,
    ) => {
      formikHelper.setSubmitting(true)
      setSuccess(undefined)
      try {
        await serverApi.changePassword(
          values.currentPassword,
          values.newPassword,
        )
        setSuccess(true)
      } catch (err) {
        setSuccess(false)
      }
      formikHelper.setSubmitting(false)
    },
    [],
  )

  return (
    <AccountLayout pathName={router.pathname}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validation}>
        {formik => {
          return (
            <Form>
              <div className="row">
                <div className="col-12 mb-3">
                  <h5 className="fw-bold">Change password</h5>
                </div>
                {success !== undefined && (
                  <p
                    className={classNames("small  mb-3", {
                      "text-danger": success === false,
                      "text-success": success === true,
                    })}>
                    {success
                      ? "Change password success!"
                      : "Current password incorrect!"}
                  </p>
                )}
                <div className="col-12">
                  <div className="mb-3">
                    <label
                      htmlFor="currentPassword"
                      className="form-label small">
                      Current Password
                    </label>
                    <Field
                      type="password"
                      className="form-control"
                      id="currentPassword"
                      name="currentPassword"
                    />
                    <p className="small text-danger mb-0">
                      <ErrorMessage name="currentPassword" />
                    </p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label small">
                      New Password
                    </label>
                    <Field
                      type="password"
                      className="form-control"
                      id="newPassword"
                      name="newPassword"
                    />
                    <p className="small text-danger mb-0">
                      <ErrorMessage name="newPassword" />
                    </p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label
                      htmlFor="confirmPassword"
                      className="form-label small">
                      Confirm Password
                    </label>
                    <Field
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                    />
                    <p className="small text-danger mb-0">
                      <ErrorMessage name="confirmPassword" />
                    </p>
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <ButtonLoading
                    isLoading={formik.isSubmitting}
                    type="submit"
                    className="btn btn-dark w-100">
                    Change password
                  </ButtonLoading>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </AccountLayout>
  )
}
export default ChangePasswordContainer
