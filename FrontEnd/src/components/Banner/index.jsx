import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Banner.module.css"; // Import CSS Module

function Banner({ fetchUrl }) {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(fetchUrl, {
          headers: {
            Authorization: "8qlOkxz4wq",
          },
        });
        const randomMovie =
          request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
          ];
        setMovie(randomMovie);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API", error);
      }
    };

    fetchData();
  }, [fetchUrl]);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className={classes.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className={classes.banner__contents}>
        <h1 className={classes.banner__title}>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className={classes.banner__buttons}>
          <button className={classes.banner__button}>Play</button>
          <button className={classes.banner__button}>My List</button>
        </div>
        <h1 className={classes.banner__description}>
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className={classes["banner--fadeBottom"]}></div>
    </header>
  );
}

export default Banner;
