import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import './free_watch.css';

export default function Free() {
  const [activeSide, setActiveSide] = useState("movies");
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);

  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjQ0YzkzNjk3MzcyYzk5ZDY5YjU5MjYyY2I2NjhkMCIsIm5iZiI6MTc1MTI5Mjg2NC42NTkwMDAyLCJzdWIiOiI2ODYyOWJjMGMwN2QyZTVjZjAzMDQ4MzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZosBHSGmiHBXFEgyml673qLAEg5JbfUXfaiCDZxvjuk';

  const url1 = "https://api.themoviedb.org/3/movie/top_rated";
  const url2 = "https://api.themoviedb.org/3/tv/on_the_air";

  const fetchMovie = async () => {
    try {
      const response = await fetch(`${url1}?page=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Response was not OK");
      }
      const data = await response.json();
      console.log('Movies Data:', data);
      setMovies(data.results || []);
    } catch (error) {
      console.log(error, 'error fetching data');
    }
  };

  const fetchTv = async () => {
    try {
      const response = await fetch(`${url2}?page=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Response was not OK");
      }
      const data = await response.json();
      console.log("Full TV Data:", data);
      console.log("Example TV item:", data.results?.[0]);

      setTv(data.results || []);
    } catch (error) {
      console.log(error, "error fetching data");
    }
  };

  useEffect(() => {
    fetchMovie();
    fetchTv();
  }, []);

  const dataToRender = activeSide === "movies" ? movies : tv;

  return (
    <div className="free_watch">
      <div className="free-header">
        <h2 className='free-title'>Free To Watch</h2>
        <div className="free-tabs">
          <button
            className={activeSide === "movies" ? "active" : ""}
            onClick={() => setActiveSide("movies")}
          >
            Movies
          </button>
          <button
            className={activeSide === "tv" ? "active" : ""}
            onClick={() => setActiveSide("tv")}
          >
            TV
          </button>
        </div>
      </div>

      <div className="free-list">
        {dataToRender.length > 0 &&
          dataToRender.map((item, index) => {
            const imagePath =
              item.poster_path ||
              item.backdrop_path ||
              item.profile_path;

            return (
            <div className="free-card" key={item.id || index}>
                <div className="movies-image-container">
                  <NextLink
                    href={`${activeSide === "movies" ? "/movies" : "/tvShows"}/${item.id}`}
                  >
                    <Image
                      src={
                      imagePath
                        ? `https://image.tmdb.org/t/p/w500${imagePath}`
                        : "https://via.placeholder.com/500x750?text=No+Image"
                      }
                      width={500}
                      height={750}
                      alt={item.title || item.name || "Untitled"}
                    />
                    {item.vote_average && (
                      <span className="vote-badge">
                      {Math.round(item.vote_average * 10)}%
                      </span>
                    )}
                    </NextLink>
                  </div>
                  <div className="movies-info">
                    <p className="movies-title">
                      {item.title || item.name}
                    </p>
                    <p className="movies-subtitle">
                      {item.release_date || item.first_air_date}
                    </p>
                  </div>
            </div>
            );
          })}
      </div>
    </div>
  );
}
