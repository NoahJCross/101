import { useState } from "react";
import "./search.css";
import { FaSearch } from "react-icons/fa";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="app__search" onSubmit={handleSubmit}>
      <input type="text" placeholder="Search..." value={searchTerm} onChange={handleChange} className="search-input" />
      <button type="submit" className="search-button">
        <FaSearch size={20} />
      </button>
    </form>
  );
};

export default Search;
