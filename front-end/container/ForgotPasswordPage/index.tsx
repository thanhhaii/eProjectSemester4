import React, { useCallback } from "react"
import FormUserLayout from "../../components/Layout/FormUser/FormUserLayout"
import { Formik, Field, Form } from "formik"
import { ForgotPasswordFormProps } from "../../models/FormValue"
import Link from "components/Link"
import pageUrls from "../../services/pageUrls"

export interface ForgotPasswordContainerProps {

}

const initialValue: ForgotPasswordFormProps = {
  email: "",
}

function ForgotPasswordContainer(props: ForgotPasswordContainerProps) {
  const handleSubmit = useCallback((values: ForgotPasswordFormProps) => {
    console.log(values )
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
                    <h1>Forgot Password</h1>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p className="gray-600">No worries, we'll send you reset instructions</p>
                    <hr className="my-3" />
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
                  <div className="col-12 mb-3">
                    <button className="btn btn-primary w-100" type="submit">
                      Continue
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

export default ForgotPasswordContainer
