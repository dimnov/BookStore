import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ShopContextProvider>
      <BrowserRouter basename="/bookstore/">
        <App />
      </BrowserRouter>
    </ShopContextProvider>
  </AuthContextProvider>
);
