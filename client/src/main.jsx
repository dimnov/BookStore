import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ShopContextProvider>
      <BrowserRouter basename="/react-project">
        <App />
      </BrowserRouter>
    </ShopContextProvider>
  </AuthContextProvider>
);
