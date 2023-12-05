import "./Navbar.css";
import logo from "../../Assets/logo.png";
import cart_icon from "../../Assets/cart_icon.png";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext.jsx";
import { AuthContext } from "../../context/AuthProvider.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase.js";
import { adminKey } from "../../config/adminKey.js";

export default function Navbar() {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const { currentUser } = useContext(AuthContext);

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
        {currentUser ? (
          <Link to="/favorite">
            <li
              onClick={() => {
                setMenu("favorite");
              }}
            >
              Favorites {menu === "favorite" ? <hr /> : null}
            </li>
          </Link>
        ) : null}
      </ul>
      <div className="nav-login-cart">
        {currentUser?.uid === adminKey ? (
          <Link to="/add">
            <button>Add</button>
          </Link>
        ) : null}

        {currentUser ? null : (
          <Link to="/login">
            <button>Sign In</button>
          </Link>
        )}
        {currentUser ? <button onClick={() => logout()}>Logout</button> : null}

        <Link to="/cart">
          <img className="cart" src={cart_icon} alt="cart" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
}
