import { NavLink } from "react-router-dom";
import NavLinks from "../../components/navlinks/NavLinks";
import styles from "./Header.module.css";
import logo from "../../../public/images/logo/logo.png";

function Header() {
  return (
    <div className={styles.headerContainer}>
      <NavLink to="/" className={styles.logoContainer}>
        <img src={logo} />
      </NavLink>

      <div className={styles.navlinks}>
        <NavLinks variant="header" />
      </div>
    </div>
  );
}

export default Header;
