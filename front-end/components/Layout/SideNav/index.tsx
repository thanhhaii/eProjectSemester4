import { memo } from "react"
import styles from "./SideNav.module.scss"

export interface SideNavProps {

}

const SideNav = memo(() => {
  return <nav className={styles.sideNav}>

  </nav>
})

export default SideNav
