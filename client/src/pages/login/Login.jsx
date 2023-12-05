import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formLoginInputs } from "../../config/formInputs.js";
import {
  signInWithEmailAndPasswordHandler,
  signInWithGoogleHandler,
} from "../../services/authService.js";
import FormInput from "../../components/formInput/FormInput.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPasswordHandler(values.email, values.password);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Invalid email or password.");
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGoogleHandler();
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("An error occurred while signing in with Google.");
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError(null);
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div>
          <form className="loginsignup-fields" onSubmit={handleSubmit}>
            {formLoginInputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <div>
              <span className="error-email-password">{error}</span>
            </div>
            <div className="buttons">
              <button className="continue" type="submit">
                Continue
              </button>
              <div className="google">
                <button className="continue" onClick={() => signInWithGoogle()}>
                  Continue with Google
                </button>
              </div>
            </div>
          </form>
          <p className="loginsignup-login">
            Don't have an account?
            <Link to="/register">
              <span>Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
