import Button from "../Button/Button";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import { IoMdMenu } from "react-icons/io";
import "./header.css";
import { useState } from "react";

const navList = ["Home", "Post", "Questions", "Pricing Plans"];

const Header = () => {
  const [active, setActive] = useState(false);
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const handleSearch = (searchTerm) => {};
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleIsActive = () => {
    setActive((prev) => !prev);
  };

  return (
    <div className="app__header">
      <div className="app__header-brand">
        <h1>DEV@Deakin</h1>
      </div>
      <Search onSearch={handleSearch} />
      <div className="app__header-buttons">
        {user ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
        <Button onClick={toggleIsActive}>
          <IoMdMenu size={24} />
        </Button>
        <SideBar isActive={active} navitems={navList} />
      </div>
    </div>
  );
};

export default Header;
