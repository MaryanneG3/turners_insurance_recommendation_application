import HeaderNavlinks from "../headerNavlinks/HeaderNavlinks";
import NavbarNavlinks from "../navbarNavlinks/NavbarNavlinks";

function NavLinks({ variant, toggleVehicleMenu }) {
  return (
    <div>
      {variant === "header" && <HeaderNavlinks />}
      {variant === "navbar" && (
        <NavbarNavlinks toggleVehicleMenu={toggleVehicleMenu} />
      )}
    </div>
  );
}

export default NavLinks;
