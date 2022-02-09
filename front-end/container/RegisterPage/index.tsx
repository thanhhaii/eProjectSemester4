import React, { useCallback, useMemo, useState } from "react"
import FormUserLayout from "../../components/Layout/FormUser/FormUserLayout"
import { Formik, Field, Form, ErrorMessage } from "formik"
import { RegisterFormProps } from "../../models/FormValuem"
import Link from "components/Link"
import pageUrls from "../../services/pageUrls"
import * as yup from "yup"
import serverApi from "../../services/server"
import axios, { AxiosError } from "axios"
import ButtonLoading from "../../components/ButtonLoading"

export interface RegisterContainerProps {}

const validation = (): yup.ObjectSchema<any> =>
  yup.object().shape({
    username: yup
      .string()
      .min(4, "Username is too short")
      .matches(/^[a-zA-Z0-9@._-]+/g, "Contains invalid characters")
      .required("Username cannot be blank"),
    password: yup
      .string()
      .min(5, "Password is too short")
      .required("Password cannot be blank"),
    email: yup
      .string()
      .email("Email invalidate")
      .required("Email cannot be blank"),
  })

const initialValue: RegisterFormProps = {
  username: "",
  password: "",
  email: "",
}

function RegisterContainer(props: RegisterContainerProps) {
  const [isShowPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<boolean>(false)

  const validationSchema = useMemo(() => validation(), [])
  const handleSubmit = useCallback(async (values: RegisterFormProps) => {
    try {
      setSuccess(false)
      setLoading(true)
      setError("")
      await serverApi.register(values)
      setLoading(false)
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
                    <Link
                      className="small pb-5 d-inline-block"
                      href={pageUrls.home}>
                      Home
                    </Link>
                    <h1>Register</h1>
                    <p className="gray-600">
                      Share your beautiful pictures with everyone
                    </p>
                    <hr className="my-3" />
                  </div>
                  <div className="col-12 mb-3">
                    {error !== "" && (
                      <p className="text-danger mb-1">{error}</p>
                    )}
                    {success && (
                      <p className="text-success mb-1">
                        Register success, you can use app!
                      </p>
                    )}
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <Field
                      type="text"
                      className="form-control fw-light"
                      placeholder="Username"
                      name="username"
                      id="username"
                    />
                    <span className="small text-danger">
                      <ErrorMessage name="username" />
                    </span>
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
                    <span className="small text-danger">
                      <ErrorMessage name="email" />
                    </span>
                  </div>
                  <div className="col-12">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <Field
                      type={isShowPassword ? "text" : "password"}
                      className="form-control fw-light"
                      placeholder="Password"
                      id="password"
                      name="password"
                    />
                    <span className="small text-danger">
                      <ErrorMessage name="password" />
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
                    <Link href={pageUrls.forgotPasswordPage} className="mb-0">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="col-12 mb-3">
                    <ButtonLoading
                      isLoading={isLoading}
                      className="btn btn-primary w-100"
                      type="submit">
                      Register
                    </ButtonLoading>
                  </div>
                  <div className="col-12">
                    <p className="small">
                      Do you already have an account?{" "}
                      <Link href={pageUrls.loginPage} className="fw-bold">
                        Login
                      </Link>
                    </p>
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
