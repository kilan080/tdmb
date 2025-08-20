'use client';
import React, { useEffect, useState, useCallback } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import tmdbApi, { config } from '@/service/service_2';
// import axios from 'axios';
import './tv.css';

export default function Page() {
   // providers
   // hooks
   // functions
   
   const [movies, setMovies] = useState([]);

   const fetchMovies = useCallback(async () => {
      try {
         const res = await tmdbApi.get(config.subUrl.popularTv);
         setMovies(res.data.results || []);
         console.log('TV Shows:', res.data.results);
      } catch (error) {
         console.error('error fetching TV Shows', error);
      }
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
   
   useEffect(() => {
      fetchMovies();
   }, [fetchMovies]);
   
   console.log('popular tv shows', movies);
   return (
      <div className="main-tv">
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
                        <NextLink href={`/tvShows/${movie.id}`}>
                              <Image
                                 src={
                                    imagePath
                                       ? `https://image.tmdb.org/t/p/w500${imagePath}`
                                       : 'https://via.placeholder.com/500x750?text=No+Image'
                                 }
                                 alt={movie.title || movie.name || 'Untitled'}
                                 width={500}
                                 height={750}
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
                           { movie.first_air_date}
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
