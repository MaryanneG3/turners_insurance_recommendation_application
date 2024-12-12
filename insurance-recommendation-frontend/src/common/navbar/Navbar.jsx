import NavLinks from "../../components/navlinks/NavLinks";
import styles from "./Navbar.module.css";

export default function Navbar({ toggleVehicleMenu }) {
  return (
    <div className={styles.navbarContainer}>
      <NavLinks variant={"navbar"} toggleVehicleMenu={toggleVehicleMenu} />
    </div>
  );
}
