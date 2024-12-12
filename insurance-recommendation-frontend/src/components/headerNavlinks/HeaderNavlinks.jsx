import styles from "../navlinks/NavLinks.module.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faLocationDot,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import "@fontsource/roboto";

const HeaderNavlinks = () => {
  return (
    <div className={styles.headerlinksContainer}>
      <NavLink to="#login/signup-page" className={styles.navlink}>
        <FontAwesomeIcon icon={faUser} className={styles.icon} />
        <p>Login / Sign Up</p>
      </NavLink>

      <NavLink to="#contact-page" className={styles.navlink}>
        <FontAwesomeIcon icon={faPhone} className={styles.icon} />
        <p>Contact Us</p>
      </NavLink>

      <NavLink to="#location-page" className={styles.navlink}>
        <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
        <p>Find Us</p>
      </NavLink>

      <NavLink to="#translated-page" className={styles.navlink}>
        <FontAwesomeIcon
          icon={faLanguage}
          className={`${styles.icon} ${styles.languageIcon}`}
        />
      </NavLink>
    </div>
  );
};

export default HeaderNavlinks;
