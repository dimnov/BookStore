import "./Newsletter.css";

export default function Newsletter() {
  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers</h1>
      <p>Subscribe to our newsletter</p>
      <div>
        <input type="email" placeholder="Your email here..." />
        <button>Subscribe</button>
      </div>
    </div>
  );
}
