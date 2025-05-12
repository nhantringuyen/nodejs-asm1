import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import classes from "./MovieDetail.module.css"; // CSS module for styling
import requests from "../../services/requests"; // Import requests for API calls
const MovieDetail = ({ movieData }) => {
  const [videoKey, setVideoKey] = useState(null);
  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    if (!movieData) return;

    const fetchVideo = async () => {
      try {
        const response = await axios.post(
          requests.fetchVideo,
          { film_id: movieData.id }, // Đây là body của POST
          {
            headers: {
              Authorization: "8qlOkxz4wq",
            },
          }
        );

        if (response.data && response.data.key) {
          setVideoKey(response.data.key);
        } else {
          setVideoKey(null);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu video từ API nội bộ", error);
        setVideoKey(null);
      }
    };

    fetchVideo();
  }, [movieData]);
  if (!movieData) return null;

  return (
    <div className={classes.movieDetail}>
      <div className={classes.left}>
        <h3 className={classes["movie-title"]}>
          {movieData.title || movieData.name
            ? movieData.title || movieData.name
            : "Title not available"}
        </h3>
        <ul className={classes["movie-meta"]}>
          {movieData.release_date && (
            <li>Release date: {movieData.release_date}</li>
          )}
          {movieData.vote_average !== undefined && (
            <li>Vote: {movieData.vote_average} / 10</li>
          )}
        </ul>
        <p>
          {movieData.overview ? movieData.overview : "Overview not available."}
        </p>
      </div>
      <div className={classes.right}>
        {videoKey ? (
          <YouTube
            videoId={videoKey}
            opts={{ height: "400", width: "100%", playerVars: { autoplay: 0 } }}
          />
        ) : (
          <figure>
            <img
              src={`${base_url}${movieData.backdrop_path}`}
              alt={movieData.name}
              className={classes.movieDetail__backdrop}
            />
          </figure>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
