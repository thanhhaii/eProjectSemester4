import React from "react"
import { withEmptyLayout } from "components/EmptyLayout"
import RegisterContainer from "container/RegisterPage"

const RegisterPage = withEmptyLayout(
  function RegisterPage() {
    return <RegisterContainer />
  },
)

export default RegisterPage
