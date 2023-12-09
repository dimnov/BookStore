import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/home/Home.jsx";
import ShopCategory from "./pages/shopCategory/ShopCategory.jsx";
import NotFound from "./pages/not-found/NotFound.jsx";
import Loading from "./components/loading/Loading.jsx";
import AuthGuard from "./guards/AuthGuard.jsx";

const LazySearch = React.lazy(() => import("./pages/search/Search.jsx"));
const LazyLogin = React.lazy(() => import("./pages/login/Login.jsx"));
const LazyRegister = React.lazy(() => import("./pages/register/Register.jsx"));
const LazyFavorite = React.lazy(() => import("./pages/favorite/Favorite.jsx"));
const LazyCart = React.lazy(() => import("./pages/cart/Cart.jsx"));
const LazyProduct = React.lazy(() => import("./pages/product/Product.jsx"));
const LazyAddProduct = React.lazy(() =>
  import("./components/addProduct/AddProduct.jsx")
);

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopCategory />} />
        <Route
          path="/cart"
          element={
            <React.Suspense fallback={<Loading />}>
              <LazyCart />
            </React.Suspense>
          }
        />
        <Route
          path="product/:productId"
          element={
            <React.Suspense fallback={<Loading />}>
              <LazyProduct />
            </React.Suspense>
          }
        />

        {/* Other Routes */}
        <Route
          path="/login"
          element={
            <React.Suspense fallback={<Loading />}>
              <LazyLogin />
            </React.Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <React.Suspense fallback={<Loading />}>
              <LazyRegister />
            </React.Suspense>
          }
        />
        <Route
          path="/search"
          element={
            <React.Suspense fallback={<Loading />}>
              <LazySearch />
            </React.Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />

        {/* Protected Routes */}
        <Route
          path="/favorite"
          element={
            <AuthGuard>
              <React.Suspense fallback={<Loading />}>
                <LazyFavorite />
              </React.Suspense>
            </AuthGuard>
          }
        />
        <Route
          path="/add"
          element={
            <AuthGuard>
              <React.Suspense fallback={<Loading />}>
                <LazyAddProduct />
              </React.Suspense>
            </AuthGuard>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
