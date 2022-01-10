import React from "react"
import ForgotPasswordContainer from "container/ForgotPasswordPage"
import { withEmptyLayout } from "components/EmptyLayout"

const ForgotPasswordPage = withEmptyLayout(
  function ForgotPasswordPage() {
    return <ForgotPasswordContainer />
  },
)

export default ForgotPasswordPage
