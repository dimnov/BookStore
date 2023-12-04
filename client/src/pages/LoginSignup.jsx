import "./css/LoginSignup.css";
import { auth, googleProvider } from "../config/firebase.js";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function LoginSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => signIn()}>Continue</button>
          <div className="google">
            <button onClick={() => signInWithGoogle()}>
              Sign in with Google
            </button>
          </div>
          <p className="loginsignup-login">
            Already have an account?{" "}
            <Link to="/register">
              <span>Login here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
