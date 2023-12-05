import "./Breadcrum.css";
import breadcrum from "../../Assets/breadcrum_arrow.png";
import { Link } from "react-router-dom";
export default function Breadcrum(props) {
  const { product } = props;

  return (
    <div className="breadcrum">
      <Link to={"/shop"}>SHOP</Link>
      <img src={breadcrum} alt="" />
      <Link to={"/shop"}>{product.category}</Link>
      <img src={breadcrum} alt="" />
      {product.name}
    </div>
  );
}
