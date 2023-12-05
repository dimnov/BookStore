import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found">
        <h1>Not Found</h1>
        <p>The page you are searching for cannot be found.</p>
        <Link to={"/shop"}>
          <button>Back to Shop</button>
        </Link>
      </div>
    </div>
  );
}
