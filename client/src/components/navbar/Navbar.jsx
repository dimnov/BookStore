import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext.jsx";

import { signOut } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase.js";

export default function Navbar() {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <div className="nav-logo">
          <img src={logo} alt="logo" />
          <p>BookStore</p>
        </div>
      </Link>
      <ul className="nav-menu">
        <Link to="/">
          <li
            onClick={() => {
              setMenu("/");
            }}
          >
            Home {menu === "/" ? <hr /> : null}
          </li>
        </Link>
        <Link to="/shop">
          <li
            onClick={() => {
              setMenu("shop");
            }}
          >
            All Books {menu === "shop" ? <hr /> : null}
          </li>
        </Link>
        <Link to="/search">
          <li
            onClick={() => {
              setMenu("search");
            }}
          >
            Search {menu === "search" ? <hr /> : null}
          </li>
        </Link>
      </ul>
      <div className="nav-login-cart">
        <Link to="/add">
          <button>Add</button>
        </Link>
        <Link to="/login">
          <button>Sign In</button>
        </Link>
        <button onClick={() => logout()}>Logout</button>
        <Link to="/cart">
          <img className="cart" src={cart_icon} alt="cart" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
}
