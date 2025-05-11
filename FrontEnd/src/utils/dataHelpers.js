export const formatMovieData = (movie) => {
    return {
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        genres: movie.genre_ids,
        // Add more fields as needed
    };
};
