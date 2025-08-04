'use client';

import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import tmdbApi, { config } from '@/service/service_2';
import axios from 'axios';
import './tv.css';

export default function Page() {
   const [movies, setMovies] = useState([]);

   const fetchMovies = async () => {
      try {
         const res = await tmdbApi.get(`${config.subUrl.tvshows}`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         // const data = await res.json();
         setMovies(res.data.results || []);
      } catch (error) {
         console.error('error fetching data', error);
      }
   };
   useEffect(() => {
      fetchMovies();
   }, []);

   function getFirstParagraph(description) {
      const firstParagraph =
         typeof description === 'string'
            ? description.split('\n\n')[0] || ''
            : '';

      return firstParagraph.length > 100
         ? firstParagraph.substring(0, 140) + '...'
         : firstParagraph;
   }
   // https://www.themoviedb.org/movie/${movie.id}

   const url = 'https://api.themoviedb.org/3/discover/tv';
   const token =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjQ0YzkzNjk3MzcyYzk5ZDY5YjU5MjYyY2I2NjhkMCIsIm5iZiI6MTc1MTI5Mjg2NC42NTkwMDAyLCJzdWIiOiI2ODYyOWJjMGMwN2QyZTVjZjAzMDQ4MzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZosBHSGmiHBXFEgyml673qLAEg5JbfUXfaiCDZxvjuk';

   console.log('popular tv shows', movies);
   return (
      <div className="maintv">
         <div className="pop-tv">
            <h1 className="poptv">Popular TV Shows</h1>
         </div>
         <div className="tv-list">
            {movies.map((movie, index) => {
               const imagePath =
                  movie.poster_path ||
                  movie.backdrop_path ||
                  movie.profile_path;

               return (
                  <div className="tv-card" key={movie.id || index}>
                     <div className="tv-image-container">
                        <NextLink href={`/tvShows/${movie.id}`} target="_blank">
                           <img
                              src={
                                 imagePath
                                    ? `https://image.tmdb.org/t/p/w500${imagePath}`
                                    : 'https://via.placeholder.com/500x750?text=No+Image'
                              }
                              alt={movie.title || movie.name || 'Untitled'}
                           />
                           {movie.vote_average && (
                              <span className="vot-badge-tv">
                                 {Math.round(movie.vote_average * 10)}%
                              </span>
                           )}
                        </NextLink>
                     </div>
                     <div className="tv_info">
                        <p className="tv-title">{movie.title || movie.name}</p>
                        <p className="tv-date">
                           {movie.release_date || movie.first_air_date}
                        </p>
                        <p className="tv-detail">
                           {getFirstParagraph(movie.overview)}...
                        </p>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
}
