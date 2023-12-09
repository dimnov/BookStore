import { Link } from "react-router-dom";

export default function NavMenuItem({ to, menu, setMenu, children }) {
  return (
    <Link to={to}>
      <li
        onClick={() => {
          setMenu(to);
        }}
      >
        {children} {menu === to ? <hr /> : null}
      </li>
    </Link>
  );
}
