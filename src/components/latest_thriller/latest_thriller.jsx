import { useState, useEffect } from 'react';
import './latest_thriller.css';
import Image from 'next/image';
import tmdbApi, { config } from '@/service/service_2';

const tabs = [
   {
      value: 'Popular',
      path: config.subUrl.airingTodayTv,
   },
   {
      value: 'Streaming',
      path: config.subUrl.popularMovies,
   },
   {
      value: 'On TV',
      path: config.subUrl.airingTodayTv,
   },
   {
      value: 'For Rent',
      path: config.subUrl.nowPlayingMovies,
   },
   {
      value: 'In Theaters',
      path: config.subUrl.popularMovies,
   },
];

export default function Opra() {
   const [path, setPath] = useState(tabs[0].path);
   const [activeTab, setActiveTab] = useState(tabs[0].value);
   const [movies, setMovies] = useState([]);
   const [loading, setLoading] = useState(false);
   const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

   const handleSetPathname = (value, newPath) => {
      setActiveTab(value);
      setPath(newPath);
   };

   useEffect(() => {
      if (!path) return;
      setLoading(true);

      (async () => {
         try {
            const res = await tmdbApi.get(path);

            if (!res.data || !res.data.results) {
               console.warn('No results found in response');
               setMovies([]);
               return;
            }

            const withVideos = await Promise.all(
               res.data.results.slice(0, 10).map(async (item) => {
                  const mediaType =
                     item.media_type || (item.title ? 'movie' : 'tv');
                  const id = item.id;
                  let videoUrl = null;

                  const videoEndpoint =
                     mediaType === 'movie'
                        ? `/3/movie/${id}/videos`
                        : `/3/tv/${id}/videos`;

                  try {
                     const trailerRes = await tmdbApi.get(videoEndpoint);

                     if (trailerRes.data && trailerRes.data.results) {
                        const videos = trailerRes.data.results;
                        const trailer = videos.find(
                           (video) =>
                              video.site === 'YouTube' &&
                              (video.type === 'Trailer' ||
                                 video.type === 'Teaser')
                        );

                        if (trailer) {
                           videoUrl = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`;
                        }
                     }
                  } catch (videoError) {
                     console.warn(
                        `Failed to fetch videos for ${mediaType} ${id}:`,
                        videoError.message
                     );
                  }

                  return {
                     ...item,
                     videoUrl,
                     mediaType,
                     displayTitle: item.title || item.name || 'Untitled',
                     displayImage:
                        item.backdrop_path ||
                        item.poster_path ||
                        item.profile_path,
                  };
               })
            );

            setMovies(withVideos);
         } catch (err) {
            console.error('Error fetching movies:', err);
            setMovies([]);
         } finally {
            setLoading(false);
         }
      })();
   }, [path]);

   const handlePlayTrailer = (movie) => {
      if (movie.videoUrl) {
         setSelectedVideoUrl(movie.videoUrl);
      } else {
         alert(`Trailer not available for "${movie.displayTitle}"`);
      }
   };

   const closeModal = () => {
      setSelectedVideoUrl(null);
   };

   return (
      <>
         <div className="latest-thriler"
            style={{
            backgroundImage: movies[0]?.backdrop_path
               ? `url(https://media.themoviedb.org/t/p/w1920_and_h427_multi_faces${movies[0].backdrop_path})`
               : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            // background: "overlay"
            }}
          >
         <div className="opera-container">
            <header className="opera-header">
               <h2 className="opera-title">Latest Trailers</h2>
               <nav className="opera-tabs">
                  {tabs.map((tab) => (
                     <button
                        key={tab.value}
                        className={`opera-tab-btn ${
                           activeTab === tab.value ? 'opera-active' : ''
                        }`}
                        onClick={() => handleSetPathname(tab.value, tab.path)}
                        disabled={loading}
                     >
                        {tab.value}
                     </button>
                  ))}
               </nav>
            </header>

            {loading && <p className="opera-loading">Loading trailers...</p>}

            {!loading && movies.length === 0 && (
               <p className="opera-no-results">No trailers found.</p>
            )}

            <div className="opera-movie-list">
               {movies.map((movie, i) => (
                  <div className="opera-movie-card" key={movie.id || i}>
                     <div className="opera-movie-image-container">
                        <Image
                           src={
                              movie.displayImage
                                 ? `https://image.tmdb.org/t/p/w300${movie.displayImage}`
                                 : 'https://via.placeholder.com/500x281?text=No+Image'
                           }
                           width={300}
                           height={169}
                           alt={movie.displayTitle}
                           // loading="lazy"
                           // onError={(e) => {
                           //    e.target.src =
                           //       'https://via.placeholder.com/500x281?text=Image+Error';
                           // }}
                        />
                        <div
                           className="opera-play-icon"
                           onClick={() => handlePlayTrailer(movie)}
                           role="button"
                           tabIndex={0}
                           onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                 handlePlayTrailer(movie);
                              }
                           }}
                        >
                           ▶
                        </div>
                        {/* {movie.videoUrl && (
                           <div className="opera-has-trailer-indicator">🎬</div>
                        )} */}
                     </div>
                     {/* <div className="opera-movie-info"> */}
                        <p className="opera-movie-title">
                           {movie.displayTitle}
                        </p>
                        <p className='dae'>{movie.releaseDate}</p>
                     {/* </div> */}
                  </div>
               ))}
            </div>
            </div>
         </div>

         {/* Video Modal */}
         {selectedVideoUrl && (
            <div
               className="video-modal"
               onClick={closeModal}
               role="dialog"
               aria-modal="true"
            >
               <div
                  className="video-modal-content"
                  onClick={(e) => e.stopPropagation()}
               >
                  <button
                     className="video-close"
                     onClick={closeModal}
                     aria-label="Close trailer"
                  >
                     ×
                  </button>
                  <iframe
                     width="100%"
                     height="500"
                     src={selectedVideoUrl}
                     title="Movie Trailer"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                  />
               </div>
            </div>
         )}
      </>
   );
}
