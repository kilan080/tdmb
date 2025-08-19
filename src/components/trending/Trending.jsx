import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import MovieCard from './movieCard';
import tmdbApi, { config } from '@/service/service_2';
import './trending.css';

function ToggleInputs() {
   const [activeSide, setActiveSide] = useState('today');
   const [moviesThisWeek, setMoviesThisWeek] = useState([]);
   const [moviesToday, setMoviesToday] = useState([]);
   const [loading, setLoading] = useState(false);
   const [activeTab, setActiveTab] = useState('today');


   const fetchTodaysMovie = async () => {
      try {
         const { data } = await tmdbApi.get(config.subUrl.discoveryTv);
         setMoviesToday(data?.results || []);
      } catch (error) {
         console.log("errors getting todays movies", error);
      }
   };

   const fetchWeeklyMovies = async () => {
      try {
         const { data } = await tmdbApi.get(config.subUrl.airingTodayTv);
         setMoviesThisWeek(data?.results || []);
      } catch (error) {
         console.log("error getting weekly movies", error);
      }
   };


   useEffect(() => {
      fetchTodaysMovie();
      fetchWeeklyMovies();
   }, []);

   console.log('movie today', moviesToday);

   return (
      <div className="trends-section">
         <div className="trends-header">
            <h2 className="trends-title">Trending</h2>
            <div className="trends-tabs">
               <button
                  className={`trends-tab ${
                     activeSide === 'today' ? 'active' : ''
                  }`}
                  onClick={() => setActiveSide('today')}
               >
                  Today
               </button>
               <button
                  className={`trends-tab ${
                     activeSide === 'thisWeek' ? 'active' : ''
                  }`}
                  onClick={() => setActiveSide('thisWeek')}
               >
                  This Week
               </button>
            </div>
         </div>

         <div className="trends-content">
            {loading && <p>Loading...</p>}

            {!loading && activeSide === 'today' && (
               <div className="trends-movies">
                  <div className="trends-movies-inner">
                     {moviesToday.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                     ))}
                  </div>
               </div>
            )}

            {!loading && activeSide === 'thisWeek' && (
               <div className="trends-movies">
                  <div className="trends-movies-inner">
                     {moviesThisWeek.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

export default ToggleInputs;
