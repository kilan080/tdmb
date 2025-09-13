import React, { useEffect, useState } from "react";
import './whats_popular.css';
import NextLink from 'next/link';
import { FaAngleDown } from "react-icons/fa";

const tabs = [
  {
    value: "Streaming",
    path: "https://api.themoviedb.org/3/movie/now_playing",
  },
  {
    value: "For Rent",
    path: "https://api.themoviedb.org/3/movie/top_rated",
  },
  {
    value: "In Theaters",
    path: "https://api.themoviedb.org/3/trending/all/day",
  },
  {
    value: "On TV",
    path: "https://api.themoviedb.org/3/trending/movie/day",
  },
];

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjQ0YzkzNjk3MzcyYzk5ZDY5YjU5MjYyY2I2NjhkMCIsIm5iZiI6MTc1MTI5Mjg2NC42NTkwMDAyLCJzdWIiOiI2ODYyOWJjMGMwN2QyZTVjZjAzMDQ4MzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZosBHSGmiHBXFEgyml673qLAEg5JbfUXfaiCDZxvjuk';

export default function Popular() {
  const [path, setPath] = useState(tabs[0].path);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSetPathname = (name, pat) => {
    setActiveTab(name);
    setPath(pat);
    setDropdownOpen(false); // close dropdown after selecting
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(path, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [path]);

  return (
    <div className="popus">
      <div className="popular-header">
        <h2 className="hmm">What's Popular</h2>

        {/* Dropdown wrapper for mobile */}
        <div className="tab-dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {activeTab} <span className={`arrow ${dropdownOpen ? "open" : ""}`}><FaAngleDown /></span>
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              {tabs.map((item) => (
                <button
                  key={item.value}
                  className={`dropdown-item ${activeTab === item.value ? "active" : ""}`}
                  onClick={() => handleSetPathname(item.value, item.path)}
                >
                  {item.value}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop tabs */}
        <div className="tab-btn">
          {tabs.map((item) => (
            <button
              className={`all ${activeTab === item.value ? "active" : ""}`}
              onClick={() => handleSetPathname(item.value, item.path)}
              key={item.value}
            >
              {item.value}
            </button>
          ))}
        </div>
      </div>

      {loading && <p>Loading...</p>}

      <div className="movie-list">
        {movies.map((movie, index) => {
          const imagePath =
            movie.poster_path ||
            movie.backdrop_path ||
            movie.profile_path;

          return (
            <div className="movie-card" key={movie.id || index}>
              <div className="movie-image-container">
                <NextLink href={`/movies/${movie.id}`}>
                  <img
                    src={
                      imagePath
                        ? `https://image.tmdb.org/t/p/w500${imagePath}`
                        : "https://via.placeholder.com/500x750?text=No+Image"
                    }
                    alt={movie.title || movie.name || "Untitled"}
                  />

                  {movie.vote_average && (
                    <span className="vote-badge">
                      {Math.round(movie.vote_average * 10)}%
                    </span>
                  )}
                </NextLink>
              </div>

              <div className="movie-info">
                <p className="movie-title">
                  {movie.title || movie.name}
                </p>
                <p className="movie-subtitle">
                  {movie.release_date || movie.first_air_date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

