import styles from "./HeaderLayout.module.scss"
import classNames from "classnames"
import Image from "next/image"
import NoUserImage from "public/images/noUser.png"
import { IconMenu2, IconSearch } from "@tabler/icons"
import Dropdown from "react-bootstrap/Dropdown"
import { forwardRef, LegacyRef, ReactNode } from "react"
import Link from "../../Link"
import { useAppSelector } from "state/hooks"
import { selectUserSigned } from "state/userSlice"
import pageUrls from "services/pageUrls"
import { Category } from "models/Categorym"

export interface HeaderLayoutProps {
  onShowModalUploadImage: () => void
  categories: Category[]
}

function HeaderLayout(props: HeaderLayoutProps) {
  const { onShowModalUploadImage, categories } = props
  const isSigned = useAppSelector(selectUserSigned)

  return (
    <div
      className={classNames(
        styles.headerLayout,
        "row justify-content-center shadow-sm",
      )}>
      <div className="col-11">
        <div className="row justify-content-between align-items-center h-100">
          <div
            className={classNames(
              "col-5 position-relative",
              styles.boxSearchResource,
            )}>
            <input
              type="text"
              className="form-control shadow-none"
              placeholder="Search resource"
              id={styles.searchResource}
            />
            <IconSearch
              className={classNames("position-absolute", styles.iconSearch)}
              size={18}
              color="gray"
              stroke={1.5}
            />
          </div>
          <div className="col-auto d-flex align-items-center">
            {isSigned ? (
              <>
                <button
                  className="btn btn btn-white btn-sm me-3 border shadow-none border-1"
                  type="button"
                  onClick={onShowModalUploadImage}>
                  Submit a photo
                </button>
                <Image
                  src={NoUserImage}
                  width={40}
                  height={40}
                  className="rounded-circle"
                  objectFit={"cover"}
                  alt="avatar no user"
                />
                <Dropdown align="end">
                  <Dropdown.Toggle as={CustomToggle} />
                  <Dropdown.Menu className="mt-3">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Link
                  href={pageUrls.loginPage}
                  className={classNames("text-dark me-3", styles.signIn)}>
                  Sign In
                </Link>
                <Link href={pageUrls.registerPage} className="text-dark">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={classNames("col-11", styles.bottomHeader)}>
        <div className="row align-items-center h-100">
          <div className={classNames("col-auto", styles.mainCategory)}>
            <Link href="#" className="text-black">
              Editorial
            </Link>
          </div>
          <div className="col">
            <ul className={styles.listCategory}>
              {categories.map(category => {
                return <li key={category.id}>{category.categoryName}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const CustomToggle = forwardRef(
  (
    {
      children,
      onClick,
    }: {
      onClick: (e: any) => void
      children: ReactNode
    },
    ref: LegacyRef<HTMLAnchorElement>,
  ) => (
    <a
      ref={ref}
      onClick={e => {
        e.preventDefault()
        onClick(e)
      }}>
      {children}
      <button className="btn btn-transparent p-1 shadow-none" type="button">
        <IconMenu2 size={20} className="ms-2" />
      </button>
    </a>
  ),
)

export default HeaderLayout
