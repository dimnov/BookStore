import "./Breadcrum.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";
import { Link } from "react-router-dom";
export default function Breadcrum(props) {
  const { product } = props;

  return (
    <div className="breadcrum">
      <Link to={"/shop"}>SHOP</Link>
      <img src={arrow_icon} alt="" />
      <Link to={"/shop"}>{product.category}</Link>
      <img src={arrow_icon} alt="" />
      {product.name}
    </div>
  );
}
