import "./Hero.css";
import hand_icon from "../../Assets/hand_icon.png";
import arrow_icon from "../../Assets/arrow.png";
import book_covers from "../../Assets/book-covers.png";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>books</p>
          <p>for everyone</p>
        </div>
        <Link className="latest-button" to={"/shop"}>
          Latest Collection <img src={arrow_icon} alt="" />
        </Link>
      </div>
      <div className="hero-right">
        <img src={book_covers} alt="" />
      </div>
    </div>
  );
}
