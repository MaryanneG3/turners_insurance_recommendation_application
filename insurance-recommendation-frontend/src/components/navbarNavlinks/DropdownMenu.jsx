import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../navlinks/NavLinks.module.css";

function DropdownMenu({ menu, title, icon, links, dropdowns, toggleMenu }) {
  return (
    <div
      className={styles.dropdownContainer}
      onMouseEnter={() => toggleMenu(menu)}
      onMouseLeave={() => toggleMenu(menu)}
    >
      <button
        className={styles.navlink}
        aria-haspopup="true"
        aria-expanded={dropdowns[menu]}
      >
        <p>{title}</p>
        <FontAwesomeIcon icon={icon} className={styles.icon} />
      </button>

      {dropdowns[menu] && (
        <div className={styles.dropdownmenu}>
          {links.map((link, index) => (
            <NavLink key={index} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
