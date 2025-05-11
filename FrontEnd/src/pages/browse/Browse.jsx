import React from 'react';
import Banner from '../../components/Banner';
import MovieList from '../../components/MovieList';
import requests from '../../services/requests';
function Browse() {
	return (
		<div className="app">
			<Banner fetchUrl={requests.fetchNetflixOriginals}/>
			<MovieList title="Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow isOriginal/>
			<MovieList title="Xu hướng" fetchUrl={requests.fetchTrending} />
			<MovieList title="Xếp hạng cao" fetchUrl={requests.fetchTopRated} />
			<MovieList title="Hành động" fetchUrl={requests.fetchActionMovies} />
			<MovieList title="Hài" fetchUrl={requests.fetchComedyMovies} />
			<MovieList title="Kinh dị" fetchUrl={requests.fetchHorrorMovies} />
			<MovieList title="Lãng mạn" fetchUrl={requests.fetchRomanceMovies} />
			<MovieList title="Tài liệu" fetchUrl={requests.fetchDocumentaries} />
		</div>
	);
}

export default Browse;

