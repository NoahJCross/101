import { Outlet, Link } from "react-router-dom";
import "./authlayout.css";

export default function AuthLayout() {
  return (
    <div className="app__authlayout">
      <div className="app__authlayout-header">
        <Link to="/">
          <h1>DEV@Deakin</h1>
        </Link>
      </div>
      <main className="app__authlayout__main">
        <Outlet />
      </main>
    </div>
  );
}
