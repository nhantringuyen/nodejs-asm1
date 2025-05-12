const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
// Models
const Movies = require("../models/Movies");
const Genres = require("../models/Genre");
const Videos = require("../models/Video");
// Sử dụng middleware xác thực cho tất cả route dưới
router.use(authMiddleware);
// Trending Movies
router.get("/trending", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 20;

  const allMovies = Movies.all();

  // Sắp xếp theo popularity giảm dần
  const sortedMovies = allMovies.sort((a, b) => b.popularity - a.popularity);

  const totalPages = Math.ceil(sortedMovies.length / pageSize);
  if (page > totalPages) {
    return res.status(200).json({
      results: [],
      page,
      total_pages: totalPages,
    });
  }

  const startIndex = (page - 1) * pageSize;
  const results = sortedMovies.slice(startIndex, startIndex + pageSize);

  res.status(200).json({
    results,
    page,
    total_pages: totalPages,
  });
});
// Top Rated Movies
router.get("/top-rate", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 20;

  const allMovies = Movies.all();

  // Sắp xếp theo vote_average giảm dần
  const sortedMovies = allMovies.sort(
    (a, b) => b.vote_average - a.vote_average
  );

  const totalPages = Math.ceil(sortedMovies.length / pageSize);
  if (page > totalPages) {
    return res.status(200).json({
      results: [],
      page,
      total_pages: totalPages,
    });
  }

  const startIndex = (page - 1) * pageSize;
  const results = sortedMovies.slice(startIndex, startIndex + pageSize);

  res.status(200).json({
    results,
    page,
    total_pages: totalPages,
  });
});

router.get("/discover", (req, res) => {
  const genreId = parseInt(req.query.genre);
  const page = parseInt(req.query.page) || 1;
  const pageSize = 20;

  if (!genreId) {
    return res.status(400).json({ message: "Not found gerne parram" });
  }

  const allGenres = Genres.all();
  const genreObj = allGenres.find((g) => g.id === genreId);

  if (!genreObj) {
    return res.status(400).json({ message: "Not found that gerne id" });
  }

  const allMovies = Movies.all();
  const filteredMovies = allMovies.filter((movie) =>
    movie.genre_ids.includes(genreId)
  );

  const totalPages = Math.ceil(filteredMovies.length / pageSize);
  const results = filteredMovies.slice((page - 1) * pageSize, page * pageSize);

  res.status(200).json({
    results,
    page,
    total_pages: totalPages,
    genre_name: genreObj.name,
  });
});

router.post("/video", (req, res) => {
  const { film_id } = req.body;

  if (!film_id) {
    return res.status(400).json({ message: "Not found film_id parram" });
  }

  const allVideos = Videos.all();
  const filmVideos = allVideos.find((v) => v.id === parseInt(film_id));

  if (!filmVideos || !filmVideos.videos || filmVideos.videos.length === 0) {
    return res.status(404).json({ message: "Not found video" });
  }

  // Lọc video theo tiêu chí
  const matchingVideos = filmVideos.videos.filter(
    (v) =>
      v.official === true &&
      v.site === "YouTube" &&
      (v.type === "Trailer" || v.type === "Teaser")
  );

  if (matchingVideos.length === 0) {
    return res.status(404).json({ message: "Not found video" });
  }

  // Ưu tiên Trailer và mới nhất
  matchingVideos.sort((a, b) => {
    // Ưu tiên Trailer
    if (a.type === "Trailer" && b.type !== "Trailer") return -1;
    if (a.type !== "Trailer" && b.type === "Trailer") return 1;

    // Nếu cùng loại, ưu tiên video mới nhất
    return new Date(b.published_at) - new Date(a.published_at);
  });

  const bestMatch = matchingVideos[0];

  res.status(200).json(bestMatch);
});

router.post("/search", (req, res) => {
  const { keyword, genre, mediaType, language, year } = req.body;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 20;

  if (!keyword || typeof keyword !== "string") {
    return res.status(400).json({ message: "Not found keyword parram" });
  }

  const genreList = Genres.all();
  const movies = Movies.all();
  const keywordLower = keyword.toLowerCase();

  let filtered = movies.filter((movie) => {
    const title = (movie.title || movie.name || "").toLowerCase();
    const overview = (movie.overview || "").toLowerCase();
    return title.includes(keywordLower) || overview.includes(keywordLower);
  });

  // Filter by genre (name)
  if (genre) {
    const genreObj = genreList.find(
      (g) => g.name.toLowerCase() === genre.toLowerCase()
    );
    if (genreObj) {
      filtered = filtered.filter((movie) =>
        movie.genre_ids.includes(genreObj.id)
      );
    } else {
      // Nếu không tìm được genre thì không lọc (hoặc có thể bỏ kết quả)
      filtered = [];
    }
  }

  // Filter by mediaType
  if (mediaType && mediaType !== "all") {
    filtered = filtered.filter((movie) => movie.media_type === mediaType);
  }

  // Filter by language
  if (language) {
    filtered = filtered.filter((movie) => movie.original_language === language);
  }

  // Filter by year
  if (year) {
    filtered = filtered.filter((movie) => {
      const dateStr = movie.release_date || movie.first_air_date || "";
      return dateStr.startsWith(year.toString());
    });
  }

  const totalPages = Math.ceil(filtered.length / pageSize);
  const results = filtered.slice((page - 1) * pageSize, page * pageSize);

  res.status(200).json({
    results,
    page,
    total_pages: totalPages,
  });
});

module.exports = router;
