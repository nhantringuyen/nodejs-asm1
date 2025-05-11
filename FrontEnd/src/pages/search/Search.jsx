import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from '../../components/SearchForm';
import ResultList from '../../components/ResultList';
import MovieDetail from '../../components/MovieList/MovieDetail'; // Assume you have this component already

function SearchPage() {
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [loading, setLoading] = useState(false); // New loading state

	const searchMovies = async (query) => {
		const api_key = '391c32141f9d013bc872bec944088b32';
		setLoading(true); // Start loading
		try {
			const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
				params: { api_key, query, language: 'en' },
			});
			setMovies(response.data.results);
		} catch (error) {
			console.error('Error fetching movies:', error);
		} finally {
			setLoading(false); // Stop loading
		}
	};

	return (
		<div>
			<SearchForm onSearch={searchMovies} />
			{loading ? (
				<p>Loading...</p> // Loading indicator
			) : (
				<>
				<ResultList movies={movies} onSelectMovie={setSelectedMovie} />
			    {selectedMovie && <MovieDetail movieData={selectedMovie} />}
				</>
			)}

		</div>
	);
}

export default SearchPage;
