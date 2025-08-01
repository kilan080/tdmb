'use client'
import React, { useEffect, useState } from 'react'
import './movie_one.css'

export default function Page() {

  const url = 'https://api.themoviedb.org/3/movie/popular'
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjQ0YzkzNjk3MzcyYzk5ZDY5YjU5MjYyY2I2NjhkMCIsIm5iZiI6MTc1MTI5Mjg2NC42NTkwMDAyLCJzdWIiOiI2ODYyOWJjMGMwN2QyZTVjZjAzMDQ4MzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZosBHSGmiHBXFEgyml673qLAEg5JbfUXfaiCDZxvjuk'

  const [movies, setMovies] = useState([]);

    useEffect(() => {
      const fetchMovies = async () => {
        try {
          const res = await fetch(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          setMovies(data.results || []);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchMovies();
    }, []);

    // function useScreenWidth() {
    //   const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

    //   useEffect(() => {
    //     const handleResize = () => setWidth(window.innerWidth);
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    //   }, []);

    //   return width;
    // }

    // const screenWidth = useScreenWidth();

    // const overviewLength = screenWidth < 768 ? 100 : 300;
    // const shortOverview = movies.overview?.slice(0, overviewLength);

    function getFirstParagraph(description) {

    const firstParagraph =
      typeof description === 'string' ? description.split('\n\n')[0] || '' : '';

      return firstParagraph.length > 100
        ? firstParagraph.substring(0, 140) + '...'
        : firstParagraph; 
    }
  
  return (
    <div className='main'>
      <div className='pop-header'>
        <h1 className='pop'>Popular Movies</h1>
      </div>
      <div className='movi-list'>
        {movies.map((movie, index) => {
          const imagePath = movie.poster_path || movie.backdrop_path || movie.profile_path;

          return(
            <div className='movi-card' key={movie.id || index}>
              <div className='movi-image-container'>
                <a href={`https://www.themoviedb.org/movie/${movie.id}`} target='_blank'>
                  <img src={
                    imagePath
                      ? `https://image.tmdb.org/t/p/w500${imagePath}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={movie.title || movie.name || "Untitled"}
                  />
                  {movie.vote_average && (
                  <span className="vot-badge">
                    {Math.round(movie.vote_average * 10)}%
                  </span>
                  )}
                </a>
              </div>
              <div className='movi_info'>
                <p className='movi-title'>{movie.title || movie.name}</p>
                <p className='movi-date'>{movie.release_date || movie.first_air_date}</p>
                <p className='movi-detail'>{getFirstParagraph(movie.overview)}...</p>

                {/* <p className='movi-detail'>{movie.overview?.slice(0, 300)}...</p> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    
  )
}
