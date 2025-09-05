
'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import './search_bar.css';

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjQ0YzkzNjk3MzcyYzk5ZDY5YjU5MjYyY2I2NjhkMCIsIm5iZiI6MTc1MTI5Mjg2NC42NTkwMDAyLCJzdWIiOiI2ODYyOWJjMGMwN2QyZTVjZjAzMDQ4MzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZosBHSGmiHBXFEgyml673qLAEg5JbfUXfaiCDZxvjuk';

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [backdrop, setBackdrop] = useState(null);
  const router = useRouter();

  // Handle input 
  const handleInputChange = (e) => setQuery(e.target.value);

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  // Fetch background (random trending item)
  
    const fetchBackdrop = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/trending/all/day?language=en-US",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (data.results?.length > 0) {
          const randomItem = data.results[Math.floor(Math.random() * data.results.length)];
          setBackdrop(randomItem.backdrop_path);
        }
      } catch (error) {
        console.error("Failed to fetch backdrop:", error);
      }
    };
    useEffect(() => {
      fetchBackdrop();
    }, []);

  // Fetch search results (debounced)
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setResults(data.results || []);
      } catch (error) {
        console.error("Search failed:", error);
      }
    };

    const debounce = setTimeout(fetchResults, 500);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="search_bar" style={{
          backgroundImage: backdrop
            ? `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(https://image.tmdb.org/t/p/original${backdrop})`
            : "none",
          backgroundSize: "cover",
          height: 300,
          width: "100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
      <div className="search-wrapper">
        <h1>Welcome.</h1>
        <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>

        <div className="input-container">
          <input
            type="text"
            placeholder="Search for a movie, TV show, person..."
            value={query}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch} className="search-btn">
            Search
          </button>
        </div>

        {results.length > 0 && (
          <ul className="dropdown">
            {results.slice(0, 10).map((item) => (
              <li key={item.id}>{item.title || item.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
