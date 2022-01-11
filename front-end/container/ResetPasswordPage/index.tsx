import React, { useCallback, useState } from "react"
import FormUserLayout from "../../components/Layout/FormUser/FormUserLayout"
import { Formik, Field, Form } from "formik"
import { ResetPasswordFormProps } from "../../models/FormValue"
import Link from "components/Link"
import pageUrls from "../../services/pageUrls"

export interface ResetPasswordPageProps {

}

const initialValue: ResetPasswordFormProps = {
  newPassword: "",
  confirmPassword: "",
}

function ResetPasswordContainer(props: ResetPasswordPageProps) {
  const [isShowPassword, setShowPassword] = useState<boolean>(false)

  const handleSubmit = useCallback((values: ResetPasswordFormProps) => {
    console.log(values)
  }, [])

  return (
    <FormUserLayout>
      <Formik initialValues={initialValue} onSubmit={handleSubmit}>
        {formik => {
          return (
            <Form className="row justify-content-center h-100 align-items-center">
              <div className="col-8">
                <div className="row">
                  <div className="col-12">
                    <h1>Reset Password</h1>
                    <p className="gray-600">Enter new password and then repeat it</p>
                    <hr className="my-3" />
                  </div>
                  <div className="col-12">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <Field
                      type={isShowPassword ? "text" : "password"}
                      className="form-control fw-light"
                      placeholder="New Password"
                      id="newPassword"
                      name="newPassword"
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <Field
                      type={isShowPassword ? "text" : "password"}
                      className="form-control fw-light"
                      placeholder="Confirm Password"
                      id="confirmPassword"
                      name="confirmPassword"
                    />
                  </div>
                  <div className="col-12 my-3 d-flex justify-content-between">
                    <div>
                      <input
                        type="checkbox" id="showPassword"
                        className="form-check-input me-2"
                        checked={isShowPassword}
                        onChange={(e) => setShowPassword(e.target.checked)} />
                      <label htmlFor="showPassword" className="form-label">Show password</label>
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <button className="btn btn-primary w-100" type="submit">
                      Reset Password
                    </button>
                  </div>
                  <div className="col-12 text-center">
                    <Link href={pageUrls.registerPage} className="fw-bold small">Back to login</Link>
                  </div>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </FormUserLayout>
  )
}

export default ResetPasswordContainer
