import { useRouter } from "next/router"
import { useIsomorphicLayoutEffect } from "react-use"
import pageUrls from "services/pageUrls"
import { useUser } from "state/hooks"
import NoUserImage from "public/images/noUser.png"
import Image from "next/image"
import { IconEdit } from "@tabler/icons"
import Link from "components/Link"

export interface ProfileContainerProps {}

const ProfileContainer = (props: ProfileContainerProps) => {
  const user = useUser()
  const router = useRouter()

  useIsomorphicLayoutEffect(() => {
    if (user) {
      return
    }

    if (router.query?.returnUrl) {
      router.replace(router.query?.returnUrl.toString())
    } else {
      router.replace(pageUrls.home)
    }
  }, [router, user])

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-5 my-5">
          <div className="row">
            <div className="col-auto">
              <div className="position-relative">
                <Image
                  src={NoUserImage}
                  alt="avatar user"
                  width={150}
                  height={150}
                  className="rounded-circle"
                />
              </div>
            </div>
            <div className="col">
              <div className="d-flex align-items-center">
                <h1 className="d-inline-block me-3">{user?.username}</h1>
                <Link
                  href={pageUrls.account}
                  className="btn btn-light border btn-sm shadow-none"
                  type="button">
                  <IconEdit size="16" stroke="1" className="me-1" />
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="col-12"></div>
      </div>
    </div>
  )
}
export default ProfileContainer
