import React from "react";
import NextLink from 'next/link';
import "./movieCard.css";

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const getImageUrl = (imagePath) => {
  if (!imagePath) return '/placeholder-image.jpg';
  return `${IMAGE_BASE_URL}${imagePath}`;
};

function TvCard({ tv }) {
  return (
    <div className="movie-card">
      <div className="poster-container">
        <NextLink href={`/tvShows/${tv.id}`}>
          <img
            src={getImageUrl(tv.poster_path)}
            alt={tv.name}
            className="poster"
          />
          <div className="vote-badge">
            {Math.round(tv.vote_average * 10)}%
          </div>
        </NextLink>
      </div>
      <h3 className="title">{tv.name}</h3>
      <p className="release-date">{formatDate(tv.first_air_date)}</p>
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

export default TvCard;
