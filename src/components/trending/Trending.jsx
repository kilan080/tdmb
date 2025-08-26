import React, { useState, useEffect } from 'react';
import MovieCard from './movieCard';
import tmdbApi, { config } from '@/service/service_2';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './trending.css';

function ToggleInputs() {
   const [activeSide, setActiveSide] = useState('today');
   const [tvThisWeek, setTvThisWeek] = useState([]);
   const [tvToday, setTvToday] = useState([]);
   const [loading, setLoading] = useState(false);
   const [dropdownOpen, setDropdownOpen] = useState(false);

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
   }, []);

   return (
      <div className="trends-section">
         <div className="trends-header">
            <h2 className="trends-title">Trending</h2>

            {/* Desktop Tabs */}
            <div className="trends-tabs desktop-only">
               <button
                  className={`trends-tab ${activeSide === 'today' ? 'active' : ''}`}
                  onClick={() => setActiveSide('today')}
               >
                  Today
               </button>
               <button
                  className={`trends-tab ${activeSide === 'thisWeek' ? 'active' : ''}`}
                  onClick={() => setActiveSide('thisWeek')}
               >
                Week
               </button>
            </div>

            {/* Mobile Dropdown */}
            <div className="trends-tabs-mobile mobile-only">
               <button
                  className="dropdown-toggle"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
               >
                  {activeSide === 'today' ? 'Today' : 'This Week'}
                  {dropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
               </button>

               {dropdownOpen && (
                  <div className="dropdown-menu">
                     <button
                        className={`dropdown-item ${activeSide === 'today' ? 'active' : ''}`}
                        onClick={() => {
                           setActiveSide('today');
                           setDropdownOpen(false);
                        }}
                     >
                        Today
                     </button>
                     <button
                        className={`dropdown-item ${activeSide === 'thisWeek' ? 'active' : ''}`}
                        onClick={() => {
                           setActiveSide('thisWeek');
                           setDropdownOpen(false);
                        }}
                     >
                        Week
                     </button>
                  </div>
               )}
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
