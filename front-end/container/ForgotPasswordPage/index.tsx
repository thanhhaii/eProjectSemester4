import React, { useCallback, useMemo, useState } from "react"
import FormUserLayout from "components/Layout/FormUser/FormUserLayout"
import { Formik, Field, Form } from "formik"
import { ForgotPasswordFormProps } from "models/FormValuem"
import Link from "components/Link"
import pageUrls from "services/pageUrls"
import * as yup from "yup"
import serverApi from "services/server"
import ButtonLoading from "components/ButtonLoading"

export interface ForgotPasswordContainerProps {}

const validation = (): yup.ObjectSchema<any> =>
  yup.object().shape({
    email: yup
      .string()
      .email("Email invalidate")
      .required("Email cannot be blank"),
  })

const initialValue: ForgotPasswordFormProps = {
  email: "",
}

function ForgotPasswordContainer(props: ForgotPasswordContainerProps) {
  const [isLoading, setLoading] = useState<boolean>(false)
  const validationSchema = useMemo(() => validation(), [])

  const handleSubmit = useCallback(async (values: ForgotPasswordFormProps) => {
    try {
      setLoading(true)
      await serverApi.forgotPassword(values.email)
      setLoading(false)
    } catch (e) {}
  }, [])

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
                    <h1>Forgot Password</h1>
                    <p className="gray-600">
                      No worries, we'll send you reset instructions
                    </p>
                    <hr className="my-3" />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="email" className="form-label">
                      E-mail
                    </label>
                    <Field
                      type="email"
                      className="form-control fw-light"
                      placeholder="example@gmail.com"
                      name="email"
                      id="email"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <ButtonLoading
                      isLoading={isLoading}
                      className="btn btn-primary w-100"
                      type="submit">
                      Continue
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
    </FormUserLayout>
  )
}

export default ForgotPasswordContainer
