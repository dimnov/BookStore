import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../components/formInput/FormInput.jsx";
import {
  registerWithEmailAndPasswordHandler,
  signInWithGoogleHandler,
} from "../../services/authService.js";
import { formRegisterInputs } from "../../config/formInputs.js";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (values.password !== values.repeatPassword) {
        return;
      }

      await registerWithEmailAndPasswordHandler(values.email, values.password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGoogleHandler();
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
            {formRegisterInputs.map((input) => (
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
