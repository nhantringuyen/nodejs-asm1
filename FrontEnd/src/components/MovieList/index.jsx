import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import classes from "./MovieList.module.css"; // Import CSS module
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieDetail from "./MovieDetail"; // Import MovieDetail component

function MovieList({
  title,
  fetchUrl,
  isLargeRow = false,
  isOriginal = false,
}) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(fetchUrl, {
          headers: {
            Authorization: "8qlOkxz4wq",
          },
        });
        setMovies(request.data.results);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API", error);
      }
    };

    fetchData();
  }, [fetchUrl]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  const sliderSettings = {
    dots: false,
    nav: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const handleMovieClick = (movie) => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null); // Ẩn thông tin nếu người dùng click lại vào bộ phim đang xem
    } else {
      setSelectedMovie(movie); // Hiển thị thông tin của bộ phim khác
    }
  };
  return (
    <section className={classes.movieSection}>
      <div className={classes.movieList}>
        <h2>{title}</h2>
        {isOriginal ? (
          <div className={classes.originalsGrid}>
            {movies.slice(0, 10).map((movie) => (
              <figure key={movie.id}>
                <img
                  className={`${classes.movieList__poster} ${classes.movieList__posterLarge}`}
                  src={`${base_url}${movie.poster_path}`}
                  alt={movie.name || movie.title}
                  onClick={() => handleMovieClick(movie)}
                />
              </figure>
            ))}
          </div>
        ) : (
          <Slider {...sliderSettings} className={classes.slickWrap}>
            {movies.map((movie) => (
              <figure key={movie.id} className={classes.slideImage}>
                <img
                  className={classes.movieList__poster}
                  src={`${base_url}${movie.backdrop_path}`}
                  alt={movie.name || movie.title}
                  onMouseEnter={() => {} /* Add hover animation here */}
                  onClick={() => handleMovieClick(movie)}
                />
              </figure>
            ))}
          </Slider>
        )}
      </div>
      {selectedMovie && <MovieDetail movieData={selectedMovie} />}
    </section>
  );
}

export default MovieList;
