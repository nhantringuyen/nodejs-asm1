import React from 'react';
import classes from './ResultList.module.css';

function ResultList({ movies, onSelectMovie }) {
    const base_url = "https://image.tmdb.org/t/p/original/";

    return (
        <div className={classes.resultList}>
            {movies.length > 0 ? (
                movies.map(movie => (
                    <img
                        key={movie.id}
                        src={`${base_url}${movie.poster_path}`}
                        alt={movie.title}
                        onClick={() => onSelectMovie(movie)}
                    />
                ))
            ) : (
                <p className={classes.notfound}>Không có bộ phim nào được tìm thấy.</p>
            )}
        </div>
    );
}

export default ResultList;
