import { auth, googleProvider } from "../../config/firebase.js";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import FormInput from "../../components/formInput/FormInput.jsx";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email...",
      errorMessage: "Email is not valid",
      label: "Email...",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password...",
      errorMessage: "Password must be at least 6 characters long",
      label: "Password...",
      pattern: "^.{6,}$",
      required: true,
    },
    {
      id: 3,
      name: "repeatPassword",
      type: "password",
      placeholder: "Repeat password...",
      errorMessage: "Passwords do not match",
      label: "Repeat password...",
      pattern: values.password,
      required: true,
    },
  ];

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Register</h1>
        <div>
          <form className="loginsignup-fields" onSubmit={submitHandler}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <div className="buttons">
              <button className="continue">Continue</button>
              <div className="google">
                <button className="continue" onClick={() => signInWithGoogle()}>
                  Continue with Google
                </button>
              </div>
            </div>
          </form>
          <p className="loginsignup-login">
            Already have an account?
            <Link to="/login">
              <span>Login here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
