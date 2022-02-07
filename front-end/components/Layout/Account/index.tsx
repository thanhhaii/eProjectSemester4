import classNames from "classnames"
import Link from "components/Link"
import { useRouter } from "next/router"
import { ReactNode, useCallback } from "react"
import pageUrls from "services/pageUrls"
import { useAppDispatch } from "state/hooks"
import { userIdentified } from "state/userSlice"
import styles from "./AccountLayout.module.scss"
import tokenManager from "services/token-manager"

export interface AccountLayoutProps {
  children: ReactNode
  pathName: string
}

const AccountLayout = (props: AccountLayoutProps) => {
  const { children, pathName } = props
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleLogout = useCallback(() => {
    tokenManager.logout()
    dispatch(userIdentified(null))
    router.replace(pageUrls.loginPage)
  }, [dispatch, router])

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-4">
          <h5 className="fw-bold">Account setting</h5>
          <ul className={styles.menu}>
            <hr className="w-50" />
            <li
              className={classNames({
                [styles.active]: pathName === pageUrls.account,
              })}>
              <Link href={pageUrls.account}>Edit profile</Link>
            </li>
            <li
              className={classNames({
                [styles.active]: pathName === pageUrls.changePassword,
              })}>
              <Link href={pageUrls.changePassword}>Change password</Link>
            </li>
            <li>
              <hr className="w-50" />
            </li>
            <li>
              <button
                className="btn btn-secondary w-50"
                type="button"
                onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="col-8">{children}</div>
      </div>
    </div>
  )
}
export default AccountLayout
