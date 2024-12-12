import Footer from "../../common/footer/Footer";
import Header from "../../common/header/Header";
import Navbar from "../../common/navbar/Navbar";
import VehicleSidebar from "../../common/vehicleSidebar/VehicleSidebar";
import styles from "./BaseLayout.module.css";
import { useState } from "react";

function BaseLayout({ children }) {
  const [openVehicleMenu, setOpenVehicleMenu] = useState(true);

  const toggleVehicleMenu = () => {
    setOpenVehicleMenu(!openVehicleMenu);
  };

  return (
    <div className={styles.baseLayout}>
      <Header />
      <Navbar toggleVehicleMenu={toggleVehicleMenu} />

      <div className={styles.mainsection}>
        <div className={styles.contentArea}>{children}</div>
        <VehicleSidebar isOpen={openVehicleMenu} />
      </div>

      <Footer />
    </div>
  );
}

export default BaseLayout;
