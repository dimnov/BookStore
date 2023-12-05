import footer_logo from "../../Assets/logo_big.png";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>BookStore</p>
      </div>
      <ul className="footer-links">
        <li>Products</li>
        <li>Stores</li>
        <li>Delivery</li>
        <li>About</li>
      </ul>
      {/* <div className="footer-social-icon">
        <div className="footer-icons-container">
          <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={pinterest_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={whatsapp_icon} alt="" />
        </div>
      </div> */}
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2023 - All Right Reserved</p>
      </div>
    </div>
  );
}
