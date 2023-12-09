import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { useContext, useEffect } from "react";

const AuthGuard = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return <>{children}</>;
};

export default AuthGuard;
