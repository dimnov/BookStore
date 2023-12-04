import Hero from "../components/hero/Hero.jsx";
import NewCollections from "../components/newCollections/NewCollections.jsx";
import Newsletter from "../components/newsletter/Newsletter.jsx";
import "./css/Shop.css";

export default function Shop() {
  return (
    <div>
      <Hero />
      <NewCollections />
      {/* <Offers /> */}
      {/* <Popular /> */}
      <Newsletter />
    </div>
  );
}
