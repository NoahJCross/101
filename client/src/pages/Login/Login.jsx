import { useNavigate } from "react-router-dom";
import "./login.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useAuthContext } from "../../context/AuthContext/AuthContext";
const Login = () => {
  const { login, user, setErr, err } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    setErr(null);
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const authenticateUser = async (event) => {
    event.preventDefault();
    const { email, password } = event.target;
    try {
      await login({ email: email.value, password: password.value });
      setErr(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app__login">
      <form onSubmit={authenticateUser} className="app__login-form">
        <article>
          <h1 className="app__login-form-heading">Sign In</h1>
          <div className="app__login-form-details">
            <input className="app__login-form-input" type="email" placeholder="Email" name="email" id="email" />
            <input
              className="app__login-form-input"
              type="password"
              placeholder="Password"
              name="password"
              id="password"
            />
            <Button type="submit">Sign In</Button>
          </div>
          {err && (
            <div className="app__login-form-error">
              <p>Error:</p>
              <ol className="app__login-form-error-list">
                <li key={err}>{err}</li>
              </ol>
            </div>
          )}
          <p className="app__login-form-redirect">
            Don't have an account?{" "}
            <Link to="/register" className="app__login-form-redirect-link">
              Sign up here.
            </Link>
          </p>
        </article>
      </form>
    </div>
  );
};
export default Login;
