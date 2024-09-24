import { useNavigate } from "react-router-dom";
import "./register.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useAuthContext } from "../../context/AuthContext/AuthContext";
const Register = () => {
  const { register, setErr, err } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    setErr(null);
  }, []);

  const registerUser = async (event) => {
    event.preventDefault();
    const { firstName, lastName, email, password } = event.target;
    try {
      await register({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      });
      setErr(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app__register">
      <form onSubmit={registerUser} className="app__register-form">
        <article>
          <h1 className="app__register-form-heading ">Sign Up</h1>
          <div className="app__register-form-details">
            <input
              className="app__register-form-input"
              type="text"
              placeholder="First Name"
              name="firstName"
              id="firstName"
            />
            <input
              className="app__register-form-input"
              type="text"
              placeholder="Last Name"
              name="lastName"
              id="lastName"
            />
            <input className="app__register-form-input" type="email" placeholder="Email" name="email" id="email" />
            <input
              className="app__register-form-input"
              type="password"
              placeholder="Password"
              name="password"
              id="password"
            />
            <Button type="submit">Sign Up</Button>
          </div>
          {err && (
            <div className="app__register-form-error">
              <p>Error:</p>
              <ol className="app__register-form-error-list">
                <li key={err}>{err}</li>
              </ol>
            </div>
          )}
          <p className="app__register-form-redirect">
            Already have an account?{" "}
            <Link to="/login" className="app__register-form-redirect-link">
              Sign in here.
            </Link>
          </p>
        </article>
      </form>
    </div>
  );
};
export default Register;
