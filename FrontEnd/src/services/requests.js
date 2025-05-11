// const API_KEY = '391c32141f9d013bc872bec944088b32';
// const requests = {
//     fetchTrending: `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`,
//     fetchNetflixOriginals: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_network=123`,
//     fetchTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`,
//     fetchActionMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`,
//     fetchComedyMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`,
//     fetchHorrorMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`,
//     fetchRomanceMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`,
//     fetchDocumentaries: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=99`,
//     fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
// };
// export default requests;

const BASE_URL = "localhost:5000/api"; // Your backend base path
const requests = {
  fetchNetflixOriginals: `${BASE_URL}/movies/discover?genre=10770`, // Netflix Originals
  fetchTrending: `${BASE_URL}/movies/trending`, // Trending
  fetchTopRated: `${BASE_URL}/movies/top-rate`, // Top Rated
  fetchActionMovies: `${BASE_URL}/movies/discover?genre=28`, // Action
  fetchComedyMovies: `${BASE_URL}/movies/discover?genre=35`, // Comedy
  fetchHorrorMovies: `${BASE_URL}/movies/discover?genre=27`, // Horror
  fetchRomanceMovies: `${BASE_URL}/movies/discover?genre=10749`, // Romance
  fetchDocumentaries: `${BASE_URL}/movies/discover?genre=99`, // Documentary

  // Optional utilities
  fetchVideo: `${BASE_URL}/movies/video`, // For trailers
  fetchSearch: `${BASE_URL}/movies/search`, // For search input
};

export default requests;
