const Movies  = require("../models/Movies");
const Genres  = require("../models/Genre");
const Videos  = require("../models/Video");

/**
 * GET /movies/trending
 */
exports.getTrending = (req, res) => {
  const page     = parseInt(req.query.page) || 1;
  const pageSize = 20;

  const sorted = Movies.all().sort((a, b) => b.popularity - a.popularity);
  const total  = Math.ceil(sorted.length / pageSize);

  if (page > total) {
    return res.status(200).json({ results: [], page, total_pages: total });
  }

  const results = sorted.slice((page - 1) * pageSize, page * pageSize);
  res.status(200).json({ results, page, total_pages: total });
};

/**
 * GET /movies/top-rate
 */
exports.getTopRated = (req, res) => {
  const page     = parseInt(req.query.page) || 1;
  const pageSize = 20;

  const sorted = Movies.all().sort((a, b) => b.vote_average - a.vote_average);
  const total  = Math.ceil(sorted.length / pageSize);

  if (page > total) {
    return res.status(200).json({ results: [], page, total_pages: total });
  }

  const results = sorted.slice((page - 1) * pageSize, page * pageSize);
  res.status(200).json({ results, page, total_pages: total });
};

/**
 * GET /movies/discover?genre=<id>&page=<n>
 */
exports.discoverByGenre = (req, res) => {
  const genreId  = parseInt(req.query.genre);
  const page     = parseInt(req.query.page) || 1;
  const pageSize = 20;

  if (!genreId) {
    return res.status(400).json({ message: "Not found gerne parram" });
  }

  const genreObj = Genres.all().find(g => g.id === genreId);
  if (!genreObj) {
    return res.status(400).json({ message: "Not found that gerne id" });
  }

  const movies      = Movies.all().filter(m => m.genre_ids.includes(genreId));
  const totalPages  = Math.ceil(movies.length / pageSize);
  const results     = movies.slice((page - 1) * pageSize, page * pageSize);

  res.status(200).json({
    results,
    page,
    total_pages: totalPages,
    genre_name: genreObj.name,
  });
};

/**
 * POST /movies/video   { film_id }
 */
exports.getFilmVideo = (req, res) => {
  const { film_id } = req.body;

  if (!film_id) {
    return res.status(400).json({ message: "Not found film_id parram" });
  }

  const filmVideos = Videos.all().find(v => v.id === parseInt(film_id));
  if (!filmVideos?.videos?.length) {
    return res.status(404).json({ message: "Not found video" });
  }

  const matches = filmVideos.videos.filter(v =>
    v.official === true &&
    v.site === "YouTube" &&
    (v.type === "Trailer" || v.type === "Teaser")
  );

  if (!matches.length) {
    return res.status(404).json({ message: "Not found video" });
  }

  matches.sort((a, b) => {
    if (a.type === "Trailer" && b.type !== "Trailer") return -1;
    if (a.type !== "Trailer" && b.type === "Trailer") return 1;
    return new Date(b.published_at) - new Date(a.published_at);
  });

  res.status(200).json(matches[0]);
};

/**
 * POST /movies/search  { keyword, genre, mediaType, language, year }
 */
exports.searchMovies = (req, res) => {
  const { keyword, genre, mediaType, language, year } = req.body;
  const page     = parseInt(req.query.page) || 1;
  const pageSize = 20;

  if (!keyword || typeof keyword !== "string") {
    return res.status(400).json({ message: "Not found keyword parram" });
  }

  const genres        = Genres.all();
  const keywordLower  = keyword.toLowerCase();
  let   filtered      = Movies.all().filter(m => {
    const title    = (m.title || m.name || "").toLowerCase();
    const overview = (m.overview || "").toLowerCase();
    return title.includes(keywordLower) || overview.includes(keywordLower);
  });

  // Genre name
  if (genre) {
    const genreObj = genres.find(
      g => g.name.toLowerCase() === genre.toLowerCase()
    );
    filtered = genreObj
      ? filtered.filter(m => m.genre_ids.includes(genreObj.id))
      : [];
  }

  // Media type / language / year
  if (mediaType && mediaType !== "all") {
    filtered = filtered.filter(m => m.media_type === mediaType);
  }
  if (language) {
    filtered = filtered.filter(m => m.original_language === language);
  }
  if (year) {
    filtered = filtered.filter(m => {
      const dateStr = m.release_date || m.first_air_date || "";
      return dateStr.startsWith(String(year));
    });
  }

  const totalPages = Math.ceil(filtered.length / pageSize);
  const results    = filtered.slice((page - 1) * pageSize, page * pageSize);

  res.status(200).json({ results, page, total_pages: totalPages });
};