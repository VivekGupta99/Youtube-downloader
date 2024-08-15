import ThemeButton from "../UI/ThemeButton"
import styles from "./Header.module.css"
import React from "react"

const Header = (props) => {
  return (
    <header className={styles["header"]}>
      <a href="/">
        <h2>
          <span>YT</span>Downloader
        </h2>
      </a>

      <ThemeButton />
    </header>
  )
}

export default Header
