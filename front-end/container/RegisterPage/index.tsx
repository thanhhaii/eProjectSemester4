import React, { useCallback, useState } from "react"
import FormUserLayout from "../../components/Layout/FormUserLayout"
import { Formik, Field, Form } from "formik"
import { RegisterFormProps } from "../../models/FormValue"
import Link from "components/Link"
import pageUrls from "../../services/pageUrls"

export interface RegisterContainerProps {

}

const initialValue: RegisterFormProps = {
  username: "",
  password: "",
  email: "",
}

function RegisterContainer(props: RegisterContainerProps) {
  const [isShowPassword, setShowPassword] = useState<boolean>(false)

  const handleSubmit = useCallback((values: RegisterFormProps) => {
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
                    <h1>Register</h1>
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
                  <div className="col-12 mb-3">
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <Field
                      type="email"
                      className="form-control fw-light"
                      placeholder="example@gmail.com"
                      name="email"
                      id="email"
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
                  <div className="col-12 my-3 d-flex justify-content-between">
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
                  <div className="col-12 mb-3">
                    <button className="btn btn-primary w-100" type="submit">
                      Register
                    </button>
                  </div>
                  <div className="col-12">
                    <p className="small">Do you already have an account? <Link href={pageUrls.loginPage} className="fw-bold">Login</Link></p>
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

export default RegisterContainer
