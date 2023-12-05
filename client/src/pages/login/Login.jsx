import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../config/firebase.js";
import FormInput from "../../components/formInput/FormInput.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // New state for tracking login errors

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email...",
      label: "Email...",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password...",
      label: "Password...",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Invalid email or password."); // Set error state if login fails
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("An error occurred while signing in with Google."); // Set error state if Google login fails
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError(null); // Clear error when user starts typing
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div>
          <form className="loginsignup-fields" onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
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
