import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import MovieCard from './movieCard';
import tmdbApi, { config } from '@/service/service_2';
import './trending.css';

function ToggleInputs() {
   const [activeSide, setActiveSide] = useState('today');
   const [tvThisWeek, setTvThisWeek] = useState([]);
   const [tvToday, setTvToday] = useState([]);
   const [loading, setLoading] = useState(false);
   const [activeTab, setActiveTab] = useState('today');


   const fetchTodaysTv = async () => {
      try {
         const { data } = await tmdbApi.get(config.subUrl.discoveryTv);
         setTvToday(data?.results || []);
      } catch (error) {
         console.log("errors getting todays tv shows", error);
      }
   };

   const fetchWeeklyTv = async () => {
      try {
         const { data } = await tmdbApi.get(config.subUrl.airingTodayTv);
         setTvThisWeek(data?.results || []);
      } catch (error) {
         console.log("error getting weekly tv shows", error);
      }
   };


   useEffect(() => {
      fetchTodaysTv();
      fetchWeeklyTv();
   }, [fetchTodaysTv, fetchWeeklyTv]);

   console.log('tv today', tvToday);

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
                     {tvToday.map((tv) => (
                        <MovieCard key={tv.id} tv={tv} />
                     ))}
                  </div>
               </div>
            )}

            {!loading && activeSide === 'thisWeek' && (
               <div className="trends-movies">
                  <div className="trends-movies-inner">
                     {tvThisWeek.map((tv) => (
                        <MovieCard key={tv.id} tv={tv} />
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

export default ToggleInputs;
