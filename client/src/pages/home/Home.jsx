import Hero from "../../components/hero/Hero.jsx";
import NewCollections from "../../components/newCollections/NewCollections.jsx";
import Newsletter from "../../components/newsletter/Newsletter.jsx";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <Hero />
      <NewCollections />
      <Newsletter />
    </div>
  );
}
