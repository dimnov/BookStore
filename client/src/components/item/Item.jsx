import { Link } from "react-router-dom";
import "./Item.css";

export default function Item(props) {
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img
          className="item-image"
          onClick={() => window.scrollTo(0, 0)}
          src={props.image}
          alt="book image"
        />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">${props.price}</div>
      </div>
    </div>
  );
}
