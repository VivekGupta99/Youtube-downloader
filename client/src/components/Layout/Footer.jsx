import styles from "./Footer.module.css"
import gitLogo from "../../assets/icons8-github-logo-48.png"

const Footer = () => {
  return (
    <footer className={styles["footer"]}>
      <a href="https://github.com/VivekGupta99">
        <img src={gitLogo} alt="github"></img>
        <span>Vivek Gupta</span>
      </a>
    </footer>
  )
}

export default Footer
