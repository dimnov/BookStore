import { Link } from "react-router-dom";
import logo from "../../Assets/logo.png";

export default function NavbarLogo() {
  return (
    <Link to="/">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>BookStore</p>
      </div>
    </Link>
  );
}
