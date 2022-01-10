import React, { useCallback, useState } from "react"
import FormUserLayout from "../../components/Layout/FormUserLayout"
import { Formik, Field, Form } from "formik"
import { LoginFormProps } from "../../models/FormValue"
import Link from "components/Link"
import pageUrls from "../../services/pageUrls"

export interface LoginContainerProps {

}

const initialValue: LoginFormProps = {
  username: "",
  password: "",
}

function LoginContainer(props: LoginContainerProps) {
  const [isShowPassword, setShowPassword] = useState<boolean>(false)

  const handleSubmit = useCallback((values: LoginFormProps) => {
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
                    <h1>Sign In</h1>
                    <p className="gray-600">Share your beautiful pictures with everyone</p>
                    <hr className="my-3" />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <Field
                      type="text"
                      className="form-control fw-light"
                      placeholder="Username"
                      name="username"
                      id="username"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="password" className="form-label">Password</label>
                    <Field
                      type={isShowPassword ? "text" : "password"}
                      className="form-control fw-light"
                      placeholder="Password"
                      id="password"
                      name="password"
                    />
                  </div>
                  <div className="col-12 my-4 d-flex justify-content-between">
                    <div>
                      <input
                        type="checkbox" id="showPassword"
                        className="form-check-input me-2"
                        checked={isShowPassword}
                        onChange={(e) => setShowPassword(e.target.checked)} />
                      <label htmlFor="showPassword" className="form-label">Show password</label>
                    </div>
                    <Link href={pageUrls.forgotPasswordPage} className="mb-0">Forgot Password?</Link>
                  </div>
                  <div className="col-12 mb-4">
                    <button className="btn btn-primary w-100" type="submit">
                      Sign In
                    </button>
                  </div>
                  <div className="col-12">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p className="small">Don't have an account? <Link href={pageUrls.registerPage} className="fw-bold">Sign
                      up for free</Link></p>
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

export default LoginContainer
