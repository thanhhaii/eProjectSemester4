import styles from "./HeaderLayout.module.scss"
import classNames from "classnames"
import Image from "next/image"
import NoUserImage from "public/images/noUser.png"
import { IconMenu2, IconSearch } from "@tabler/icons"
import Dropdown from "react-bootstrap/Dropdown"
import { forwardRef, LegacyRef, ReactNode, useCallback } from "react"
import Link from "../../Link"
import { useAppDispatch, useAppSelector } from "state/hooks"
import { isAdminOrMod, selectUserSigned } from "state/userSlice"
import pageUrls from "services/pageUrls"
import { Category } from "models/Categorym"
import { useUser } from "state/hooks"
import { useRouter } from "next/router"
import tokenManager from "services/token-manager"
import { userIdentified } from "state/userSlice"

export interface HeaderLayoutProps {
  onShowModalUploadImage: () => void
  // onChangePage: (pageUrls: string) => void
  categories: Category[]
}

function HeaderLayout(props: HeaderLayoutProps) {
  const { onShowModalUploadImage, categories } = props
  const isSigned = useAppSelector(selectUserSigned)
  const user = useUser()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const isManage = useAppSelector(isAdminOrMod)

  const handleLogout = useCallback(() => {
    tokenManager.logout()
    dispatch(userIdentified(null))
    router.replace(pageUrls.loginPage)
  }, [dispatch, router])

  return (
    <div
      className={classNames(
        styles.headerLayout,
        "row justify-content-center shadow",
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
                  src={user?.profile?.avatar || NoUserImage}
                  width={40}
                  height={40}
                  className={classNames("rounded-circle", styles.hoverAvatar)}
                  objectFit={"cover"}
                  alt="avatar no user"
                  onClick={() => router.replace(pageUrls.profile.myprofile)}
                />
                <Dropdown align="end">
                  <Dropdown.Toggle as={CustomToggle} />
                  <Dropdown.Menu className="mt-3">
                    <Dropdown.Item as={Link} href={pageUrls.profile.myprofile}>
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} href={pageUrls.account}>
                      Edit profile
                    </Dropdown.Item>
                    {isManage && (
                      <Dropdown.Item as={Link} href={pageUrls.manage.category}>
                        Manage category
                      </Dropdown.Item>
                    )}
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
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
            <Link
              href={pageUrls.home}
              className={classNames(styles.linkDefault, {
                "text-dark": router.pathname === pageUrls.home,
              })}>
              Editorial
            </Link>
            <Link
              href={pageUrls.collection}
              className={classNames("ms-2", styles.linkDefault, {
                "text-dark": router.pathname === pageUrls.collection,
              })}>
              Favorite
            </Link>
          </div>
          <div className="col">
            <ul className={styles.listCategory}>
              {categories
                .filter(category => category.isShow)
                .map(category => {
                  return (
                    <li key={category.id}>
                      <Link
                        className={classNames({
                          "text-dark":
                            router.query.categoryName === category.categoryName,
                        })}
                        href={pageUrls.listImageCategory(
                          category.categoryName,
                        )}>
                        {category.categoryName}
                      </Link>
                    </li>
                  )
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
