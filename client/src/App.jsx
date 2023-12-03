import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Shop from "./pages/Shop.jsx";
import ShopCategory from "./pages/ShopCategory.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import LoginSignup from "./pages/LoginSignup.jsx";
import Footer from "./components/footer/Footer.jsx";

import AddProduct from "./components/addProduct/AddProduct.jsx";
import NotFound from "./components/notFound/NotFound.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/shop" element={<ShopCategory />} />
        <Route path="product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
