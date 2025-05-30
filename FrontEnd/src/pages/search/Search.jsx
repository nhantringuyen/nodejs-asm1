import React, { useState } from "react";
import axios from "axios";
import SearchForm from "../../components/SearchForm";
import ResultList from "../../components/ResultList";
import MovieDetail from "../../components/MovieList/MovieDetail"; // Assume you have this component already
import requests from "../../services/requests";
function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState("");
  const [keyword, setKeyword] = useState(""); 
   const [hasSubmitted, setHasSubmitted] = useState(false);

  const searchMovies = async (query, genre, mediaType, language, year) => {
    const token = "8qlOkxz4wq"; // Token bạn đang dùng ở backend
    setHasSubmitted(true);
    setKeyword(query);

    if (!query || query.trim() === "") {
      setError("");
      setMovies([]);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        requests.fetchSearch, // Đảm bảo đường dẫn đúng tới backend của bạn, ví dụ: "/api/search"
        {
          keyword: query, // Gửi keyword (tìm kiếm)
          genre: genre, // Gửi genre (thể loại)
          mediaType: mediaType, // Gửi mediaType (phim hoặc show truyền hình)
          language: language, // Gửi ngôn ngữ
          year: year, // Gửi năm
        },
        {
          headers: {
            Authorization: token, // Nếu cần thiết
          },
        }
      );
      setMovies(response.data.results); // Cập nhật danh sách phim nhận được từ backend
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Lỗi khi tìm kiếm phim");
      setMovies([]);
    } finally {
      setLoading(false); // Dừng loading
    }
  };

  return (
    <>
      <SearchForm onSearch={searchMovies} />
      {loading && <p>Loading...</p>}

      {!loading && ( 
        (!keyword || keyword.trim() === "") ? (
          <p style={{ color: "gray", textAlign: "center"  }}>
            {hasSubmitted
              ? "Bạn chưa nhập từ khóa, vui lòng nhập để tìm kiếm."
              : "Vui lòng nhập từ khóa để tìm kiếm."}
          </p>
        ) : error ? (
          <p style={{ color: "red", textAlign: "center"  }}>{error}</p>
        ) : (
          <>
          <ResultList movies={movies} onSelectMovie={setSelectedMovie} />
          {selectedMovie && <MovieDetail movieData={selectedMovie} />}
        </>
        )
      )}
    </>
  );
}

export default SearchPage;
