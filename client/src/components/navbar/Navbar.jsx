import "./Navbar.css";
import { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { adminKey } from "../../config/adminKey.js";
import NavbarLogo from "./NavbarLogo.jsx";
import NavbarMenuItem from "./NavbarMenuItem.jsx";
import NavbarRightPanel from "./NavbarRightPanel.jsx";
import { userSignOut } from "../../services/userService.js";

export default function Navbar() {
  const [menu, setMenu] = useState("/");
  const { getTotalCartItems } = useContext(ShopContext);
  const { currentUser } = useContext(AuthContext);

  const logout = async () => {
    try {
      await userSignOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="navbar">
      <NavbarLogo />
      <ul className="nav-menu">
        <NavbarMenuItem to="/" menu={menu} setMenu={setMenu}>
          Home
        </NavbarMenuItem>

        <NavbarMenuItem to="/shop" menu={menu} setMenu={setMenu}>
          All Books
        </NavbarMenuItem>

        <NavbarMenuItem to="/search" menu={menu} setMenu={setMenu}>
          Search
        </NavbarMenuItem>

        {currentUser ? (
          <NavbarMenuItem to="/favorite" menu={menu} setMenu={setMenu}>
            Favorites
          </NavbarMenuItem>
        ) : null}
      </ul>
      <NavbarRightPanel
        currentUser={currentUser}
        adminKey={adminKey}
        logout={logout}
        getTotalCartItems={getTotalCartItems}
      />
    </div>
  );
}
