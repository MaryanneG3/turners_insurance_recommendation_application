import { useState } from "react";
import styles from "../navlinks/NavLinks.module.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faAngleDown,
  faAngleDoubleDown,
} from "@fortawesome/free-solid-svg-icons";
import DropdownMenu from "./DropdownMenu";

function NavbarNavlinks({ toggleVehicleMenu }) {
  const [dropdowns, setDropdowns] = useState({
    howToBuy: false,
    sellYourCar: false,
    financeAndInsurance: false,
    tools: false,
    servicesAndInfo: false,
  });

  const toggleMenu = (menu) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  return (
    <div className={styles.navbarlinksContainer}>
      <div className={styles.leftSection}>
        <NavLink to="#find-a-car-page" className={styles.navlink}>
          <p>Find a Car</p>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} />
        </NavLink>

        <DropdownMenu
          menu="howToBuy"
          title="How to Buy"
          icon={faAngleDown}
          dropdowns={dropdowns}
          toggleMenu={toggleMenu}
          links={[
            { to: "#view-our-cars-page", label: "View our Cars" },
            { to: "#ways-to-buy", label: "Ways to Buy" },
            { to: "#book-a-test-drive", label: "Book a test drive" },
            { to: "#how-to-pay", label: "How to pay" },
            { to: "#faqs-about-buying", label: "FAQs about buying" },
            { to: "#turners-live", label: "Turners live" },
            { to: "#website-tools", label: "Website tools" },
          ]}
        />

        <DropdownMenu
          menu="sellYourCar"
          title="Sell your Car"
          icon={faAngleDown}
          dropdowns={dropdowns}
          toggleMenu={toggleMenu}
          links={[
            { to: "#ways-to-sell", label: "Ways to sell" },
            { to: "#book-an-appraisal", label: "Book an appraisal" },
            { to: "#faqs-about-selling", label: "FAQs about selling" },
          ]}
        />

        <DropdownMenu
          menu="financeAndInsurance"
          title="Finance & Insurance"
          icon={faAngleDown}
          dropdowns={dropdowns}
          toggleMenu={toggleMenu}
          links={[
            { to: "#finance-info", label: "Finance information" },
            { to: "#finance-faq", label: "Finance FAQ" },
            {
              to: "#apply-online-for-finance",
              label: "Apply Online for Finance",
            },
            {
              to: "#apply-for-business-finance",
              label: "Apply Online for Business Finance",
            },
            { to: "#car-insurance", label: "Car Insurance" },
          ]}
        />
      </div>

      <div className={styles.rightSection}>
        <DropdownMenu
          menu="tools"
          title="Tools"
          icon={faAngleDown}
          dropdowns={dropdowns}
          toggleMenu={toggleMenu}
          links={[
            {
              to: "/tools/insurance-recommendation-ai",
              label: "Insurance Recommendation AI",
            },
            {
              to: "/tools/insurance-quote-estimation-calculator",
              label: "Insurance Premium Calculator",
            },
            {
              to: "/tools/mock-interview-ai",
              label: "Mock Interview AI",
            },
          ]}
        />

        <DropdownMenu
          menu="servicesAndInfo"
          title="Services & Info"
          icon={faAngleDown}
          dropdowns={dropdowns}
          toggleMenu={toggleMenu}
          links={[
            { to: "#money-back-page", label: "5 day Money Back Guarentee" },
            { to: "#turners-overview", label: "Turners Group Overview" },
            { to: "#terms-and-conditions", label: "Terms & Conditions" },
          ]}
        />

        <div className={styles.navlink} onClick={toggleVehicleMenu}>
          <p>Vehicles</p>
          <FontAwesomeIcon icon={faAngleDoubleDown} className={styles.icon} />
        </div>
      </div>
    </div>
  );
}

export default NavbarNavlinks;
