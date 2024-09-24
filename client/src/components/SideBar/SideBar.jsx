import { Link } from "react-router-dom";
import { generateSlug } from "../../utils/generateSlug";
import "./sidebar.css";

const SideBar = ({ navitems, isActive }) => {
  return (
    isActive && (
      <div className="app__sidebar">
        <ul className="app__sidebar-navlist">
          {navitems.map((navitem, index) => (
            <li key={index} className="app__sidebar-navitem">
              <Link to={generateSlug(navitem)}>{navitem}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default SideBar;
