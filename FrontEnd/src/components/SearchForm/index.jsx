import React, { useState } from 'react';
import classes from './SearchForm.module.css';
import { FaSearch } from 'react-icons/fa'; // Thêm icon tìm kiếm

function SearchForm({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    const handleReset = () => {
        setQuery('');
        onSearch('');
    };

    return (
        <form onSubmit={handleSearch} className={classes.searchForm}>
            <div className={classes['input-wrap']}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a movie..."
                    className={classes.searchInput}
                />
                <span className={classes.icon}><FaSearch/></span>
            </div>
            <div className={classes['button-wrap']}>
                <button type="button" className={classes.resetButton} onClick={handleReset}>
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
