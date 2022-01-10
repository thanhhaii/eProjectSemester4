import React from "react"
import LoginContainer from "container/LoginPage"
import { withEmptyLayout } from "components/EmptyLayout"

const LoginPage = withEmptyLayout(
  function LoginPage() {
    return <LoginContainer />
  },
)

export default LoginPage
