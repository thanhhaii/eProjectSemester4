import classNames from "classnames"
import Link from "components/Link"
import { ReactNode } from "react"
import pageUrls from "services/pageUrls"
import styles from "./AccountLayout.module.scss"

export interface AccountLayoutProps {
  children: ReactNode
  pathName: string
}

const AccountLayout = (props: AccountLayoutProps) => {
  const { children, pathName } = props

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-4">
          <h5 className="fw-bold">Account setting</h5>
          <ul className={styles.menu}>
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
          </ul>
        </div>
        <div className="col-8">{children}</div>
      </div>
    </div>
  )
}
export default AccountLayout
