import React, { useState } from "react";
import classes from "./SearchForm.module.css";
import { FaSearch } from "react-icons/fa"; // Thêm icon tìm kiếm

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [language, setLanguage] = useState("");
  const [year, setYear] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Gửi tất cả các giá trị của form vào hàm onSearch
    onSearch(query, genre, mediaType, language, year);
  };

  const handleReset = () => {
    setQuery("");
    setGenre("");
    setMediaType("");
    setLanguage("");
    setYear("");
    onSearch("", "", "", "", ""); // Reset các tham số
  };

  return (
    <form onSubmit={handleSearch} className={classes.searchForm}>
      <div className={classes["input-wrap"]}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className={classes.searchInput}
        />
        <span className={classes.icon}>
          <FaSearch />
        </span>
      </div>
      {/* Các input cho genre, mediaType, language, year */}
      <div className={classes["input-wrap"]}>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Enter genre..."
          className={classes.searchInput}
        />
      </div>
      <div className={classes["input-wrap"]}>
        <input
          type="text"
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
          placeholder="Enter media type (movie/show)..."
          className={classes.searchInput}
        />
      </div>
      <div className={classes["input-wrap"]}>
        <input
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          placeholder="Enter language..."
          className={classes.searchInput}
        />
      </div>
      <div className={classes["input-wrap"]}>
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Enter year..."
          className={classes.searchInput}
        />
      </div>
      <div className={classes["button-wrap"]}>
        <button
          type="button"
          className={classes.resetButton}
          onClick={handleReset}
        >
          RESET
        </button>
        <button type="submit" className={classes.searchButton}>
          SEARCH
        </button>
      </div>
    </form>
  );
}
export default SearchForm;
