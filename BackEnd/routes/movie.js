const express        = require("express");
const router         = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const movieCtrl      = require("../controllers/movie");

// Áp dụng middleware xác thực
router.use(authMiddleware);

// --- Movies ---
router.get ("/trending",  movieCtrl.getTrending);
router.get ("/top-rate",  movieCtrl.getTopRated);
router.get ("/discover",  movieCtrl.discoverByGenre);
router.post("/video",     movieCtrl.getFilmVideo);
router.post("/search",    movieCtrl.searchMovies);

module.exports = router;
