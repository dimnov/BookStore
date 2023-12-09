import { Link } from "react-router-dom";
import cart_icon from "../../Assets/cart_icon.png";

export default function NavLoginCart({
  currentUser,
  adminKey,
  logout,
  getTotalCartItems,
}) {
  return (
    <div className="nav-login-cart">
      {currentUser?.uid === adminKey && (
        <Link to="/add">
          <button>Add</button>
        </Link>
      )}

      {currentUser ? null : (
        <Link to="/login">
          <button>Sign In</button>
        </Link>
      )}
      {currentUser && <button onClick={() => logout()}>Logout</button>}

      <Link to="/cart">
        <img className="cart" src={cart_icon} alt="cart" />
      </Link>
      <div className="nav-cart-count">{getTotalCartItems()}</div>
    </div>
  );
}
