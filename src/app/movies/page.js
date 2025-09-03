'use client';
import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import Image from "next/image";
import tmdbApi, { config } from '@/service/service_2';
import './movie_one.css';

export default function Page() {
   const [movies, setMovies] = useState([]);

   const fetchMovies = async () => {
      try {
         const res = await tmdbApi.get(config.subUrl.popularMovies);
         setMovies(res.data.results || []);
      } catch (error) {
         console.error('Error fetching data:', error);
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

   return (
      <div className="main">
         <div className="pop-header">
            <h1 className="pop">Popular Movies</h1>
         </div>
         <div className="movi-list">
            {movies.map((movie, index) => {
               const imagePath =
                  movie.poster_path ||
                  movie.backdrop_path ||
                  movie.profile_path;

               return (
                  <div className="movi-card" key={movie.id || index}>
                     <div className="movi-image-container">
                        <NextLink href={`/movies/${movie.id}`}>
                           <Image
                              src={
                                 imagePath
                                    ? `https://image.tmdb.org/t/p/w500${imagePath}`
                                    : 'https://via.placeholder.com/500x750?text=No+Image'
                              }
                              alt={movie.title || movie.name || 'Untitled'}
                              width={300}
                              height={200}
                           />
                           {movie.vote_average && (
                              <span className="vot-badge">
                                 {Math.round(movie.vote_average * 10)}%
                              </span>
                           )}
                        </NextLink>
                     </div>
                     <div className="movi_info">
                        <p className="movi-title">
                           {movie.title || movie.name}
                        </p>
                        <p className="movi-date">
                           {movie.release_date || movie.first_air_date}
                        </p>
                        <p className="movi-detail">
                           {getFirstParagraph(movie.overview)}...
                        </p>

                        {/* <p className='movi-detail'>{movie.overview?.slice(0, 300)}...</p> */}
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
}
