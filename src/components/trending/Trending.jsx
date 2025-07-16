import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import MovieCard from "./movieCard";
import "./trending.css"

function ToggleInputs() {
    const [activeSide, setActiveSide] = useState("today");
    const [moviesThisWeek, setMoviesThisWeek] = useState([]);
    const [moviesToday, setMoviesToday] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("today")


    const url = "https://api.themoviedb.org/3/discover/tv";
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjQ0YzkzNjk3MzcyYzk5ZDY5YjU5MjYyY2I2NjhkMCIsIm5iZiI6MTc1MTI5Mjg2NC42NTkwMDAyLCJzdWIiOiI2ODYyOWJjMGMwN2QyZTVjZjAzMDQ4MzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZosBHSGmiHBXFEgyml673qLAEg5JbfUXfaiCDZxvjuk';

    const url2 = 'https://api.themoviedb.org/3/tv/airing_today';

    const alUrl = 'https://api.themoviedb.org/3/tv/airing_today/uploads/2meX1nMdScFOoV4370rqHWKmXhY.jpg';
    // const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

    const fetchTodaysMovie = async () => {
        try { 

                fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Data received:', data);
                       setMoviesToday(data.results);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } catch(error) {
            console.log('errors', error)
        }
    }

    const fetchWeeklyMovies = async () => {
        try {
            fetch(url2, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                }
              })
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  return response.json();
              })
              .then(data => {
                  console.log('Data received weekly:', data);
                  setMoviesThisWeek(data.results)
              })
              .catch(error => {
                  console.error('Error fetching data:', error);
            });
        } catch (error) {
            console.log('error', error)
        }
    }

        const test = async () => {
        try {
            fetch(alUrl, {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              })
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  return response.json();
              })
              .then(data => {
                  console.log('single images ', data);
              })
              .catch(error => {
                  console.error('Error fetching single data:', error);
            });
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        fetchTodaysMovie()
        fetchWeeklyMovies()
        test()
    }, [])

    console.log('movie today', moviesToday);


    const toggleSide = () => {
        setActiveSide((prev) =>
            prev === "today" ? "thisWeek" : "today"
        );
    };


    return (
        <div className="trends-section">
            <div className="trends-header">
                <h2 className="trends-title">Trending</h2>
                <div className="trends-tabs">
                    <button
                        className={`trends-tab ${activeSide === "today" ? "active" : ""}`}
                        onClick={() => setActiveSide("today")}
                    >
                        Today
                    </button>
                    <button
                        className={`trends-tab ${activeSide === "thisWeek" ? "active" : ""}`}
                        onClick={() => setActiveSide("thisWeek")}
                    >
                        This Week
                    </button>
                </div>
            </div>

            <div className="trends-content">
                {loading && <p>Loading...</p>}

                {!loading && activeSide === "today" && (
                <div className="trends-movies">
                    <div className="trends-movies-inner">
                    {moviesToday.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                    </div>
                </div>
                )}

                {!loading && activeSide === "thisWeek" && (
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