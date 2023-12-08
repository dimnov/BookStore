import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./pages/home/Home.jsx";
import ShopCategory from "./pages/shopCategory/ShopCategory.jsx";
import Product from "./pages/product/Product.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Footer from "./components/footer/Footer.jsx";

import AddProduct from "./components/addProduct/AddProduct.jsx";
import NotFound from "./pages/not-found/NotFound.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Search from "./pages/search/Search.jsx";
import Favorite from "./pages/favorite/Favorite.jsx";
import AuthGuard from "./guards/AuthGuard.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopCategory />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>

        {/* Other Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected Routes */}
        <Route
          path="/favorite"
          element={
            <AuthGuard>
              <Favorite />
            </AuthGuard>
          }
        />
        <Route
          path="/add"
          element={
            <AuthGuard>
              <AddProduct />
            </AuthGuard>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
