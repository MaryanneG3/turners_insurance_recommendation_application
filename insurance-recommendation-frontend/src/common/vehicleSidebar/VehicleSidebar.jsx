import styles from "./VehicleSidebar.module.css";
import { NavLink } from "react-router-dom";

function VehicleSidebar({ isOpen }) {
  const links = [
    { to: "#Cars-page", label: "Cars" },
    { to: "#Trucks & Machinery", label: "Trucks & Machinery" },
    { to: "#Damaged & End of Life", label: "Damaged & End of Life" },
    { to: "#Motorcycles", label: "Motorcycles" },
    { to: "#General Goods", label: "General Goods" },
    {
      to: "#Buses, Caravans & Motorhomes",
      label: "Buses, Caravans & Motorhomes",
    },
    { to: "#Boats & Marine", label: "Boats & Marine" },
  ];

  return (
    <div className={styles.sidebarContainer}>
      {isOpen && (
        <div className={styles.sidebarlinkscontainer}>
          <div className={styles.container2}>
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                className={styles.sidebarnavlink}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleSidebar;
