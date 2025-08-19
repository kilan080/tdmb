import React from "react";
import NextLink from 'next/link';
import "./movieCard.css";

    const getImageUrl = (imagePath) => {
        if(!imagePath) return '/placeholder-image.jpg';
        return `${IMAGE_BASE_URL}${imagePath}`
    }

     const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function MovieCard({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w220${movie.poster_path}`
    : "https://via.placeholder.com/220x330?text=No+Image";

  return (
    <div className="movie-card">
      <div className="poster-container">
        <NextLink href={`/movies/${movie.id}`}>
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.name || movie.title}
            className="poster"
          />
          <div className="vote-badge">
            {Math.round(movie.vote_average * 10)}%
          </div>
        </NextLink>
      </div>
      <h3 className="title">{movie.name || movie.title}</h3>
      <p className="release-date">
        {formatDate(movie.release_date)}
      </p>
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

export default MovieCard;