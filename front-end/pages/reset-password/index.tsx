import React from "react"
import { withEmptyLayout } from "components/EmptyLayout"
import RegisterContainer from "container/ResetPasswordPage"

const ResetPasswordPage = withEmptyLayout(
  function ResetPasswordPage() {
    return <RegisterContainer />
  },
)

export default ResetPasswordPage
