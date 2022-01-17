import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react"
import FormUserLayout from "components/Layout/FormUser/FormUserLayout"
import { Formik, Field, Form, ErrorMessage } from "formik"
import { LoginFormProps } from "models/FormValue"
import Link from "components/Link"
import pageUrls from "services/pageUrls"
import * as yup from "yup"
import ButtonLoading from "components/ButtonLoading"
import serverApi from "services/server"
import { useAppDispatch, useUser } from "../../state/hooks"
import { useRouter } from "next/router"
import tokenManager from "services/token-manager"
import { userIdentified } from "../../state/userSlice"

export interface LoginContainerProps {

}

const initialValue: LoginFormProps = {
  username: "",
  password: "",
}

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
  })

function LoginContainer(props: LoginContainerProps) {
  const [isShowPassword, setShowPassword] = useState<boolean>(false)
  const validationSchema = useMemo(() => validation(), [])
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isFailed, setFailed] = useState<boolean>(false)
  const user = useUser()
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      return
    }

    if (router.query?.returnUrl) {
      router.replace(router.query?.returnUrl.toString())
    } else {
      router.replace(pageUrls.home)
    }

  }, [router, user])

  const handleSubmit = useCallback(async (values: LoginFormProps) => {
    try {
      setLoading(true)
      setFailed(false)
      const tokenInfo = await serverApi.login(values)
      if (tokenInfo) {
        await tokenManager.setToken(tokenInfo)
        const user = await serverApi.getMe()
        dispatch(userIdentified(user))
        await router.replace(pageUrls.home)
      } else {
        setFailed(true)
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
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
                    <h1>Login</h1>
                    <p className="gray-600">Share your beautiful pictures with everyone</p>
                    <hr className="my-3" />
                  </div>
                  <div className="col-12">
                    {isFailed && <p className="text-danger mb-0">Login fail, please try again</p>}
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
                    <span className="text-danger small">
                      <ErrorMessage name="username" />
                    </span>
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
                    <span className="text-danger small">
                      <ErrorMessage name="password" />
                    </span>
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
                    <ButtonLoading isLoading={isLoading} className="btn btn-primary w-100" type="submit">
                      Login
                    </ButtonLoading>
                  </div>
                  <div className="col-12">
                    <p className="small">Don't have an account? <Link href={pageUrls.registerPage} className="fw-bold">Register
                      for free</Link></p>
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
