'use client'
import React, { useCallback, useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; 
import Image from 'next/image';
import NextLink from 'next/link';
import './searp.css';

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjQ0YzkzNjk3MzcyYzk5ZDY5YjU5MjYyY2I2NjhkMCIsIm5iZiI6MTc1MTI5Mjg2NC42NTkwMDAyLCJzdWIiOiI2ODYyOWJjMGMwN2QyZTVjZjAzMDQ4MzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZosBHSGmiHBXFEgyml673qLAEg5JbfUXfaiCDZxvjuk';

// Separate the component that uses useSearchParams
function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [activeTab, setActiveTab] = useState('tv');
  const [results, setResults] = useState({
    tv: [],
    movies: [],
    people: [],
    keywords: [],
  });
  const [loading, setLoading] = useState(false);

  const fetchResults = useCallback(async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const endpoints = {
        tv: `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}&language=en-US&page=1`,
        movies: `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`,
        people: `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(query)}&language=en-US&page=1`,
        keywords: `https://api.themoviedb.org/3/search/keyword?query=${encodeURIComponent(query)}&page=1`,
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const [tvRes, movieRes, peopleRes, keywordRes] = await Promise.all([
        fetch(endpoints.tv, { headers }).then(res => res.json()),
        fetch(endpoints.movies, { headers }).then(res => res.json()),
        fetch(endpoints.people, { headers }).then(res => res.json()),
        fetch(endpoints.keywords, { headers }).then(res => res.json()),
      ]);

      setResults({
        tv: tvRes?.results || [],
        movies: movieRes?.results || [],
        people: peopleRes?.results || [],
        keywords: keywordRes?.results || [],
      });
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  if (loading) {
    return <div className="loading">Searching...</div>;
  }

  return (
    <div className="both-container">
      <div className="search-tabs">
        <h3>Search Results for &quot;{query}&quot;</h3>
        <div className='all-btns'>
          <button 
            className={activeTab === 'tv' ? 'active' : ''}
            onClick={() => setActiveTab('tv')}
          >
            TV  ({results.tv.length})
          </button>
          <button 
            className={activeTab === 'movies' ? 'active' : ''}
            onClick={() => setActiveTab('movies')}
          >
            Movies ({results.movies.length})
          </button>
          <button 
            className={activeTab === 'people' ? 'active' : ''}
            onClick={() => setActiveTab('people')}
          >
            People ({results.people.length})
          </button>
          <button 
            className={activeTab === 'keywords' ? 'active' : ''}
            onClick={() => setActiveTab('keywords')}
          >
            Keywords ({results.keywords.length})
          </button>
        </div>
      </div>

      <div className="search-results">
        {activeTab === 'tv' && results.tv?.map((item) => (
          <NextLink key={item.id} href={`/tvShows/${item.id}`}>
            <div className="result-card">
              <Image 
                src={
                  item.poster_path || item.backdrop_path
                    ? `https://media.themoviedb.org/t/p/w94_and_h141_bestv2${item.poster_path || item.backdrop_path}`
                    : "/fallback.png"
                }
                alt={item.name || "TV Show"}
                width={94}
                height={141}
              />
              <div className='tails'>
                <h2>{item.name}</h2>
                <p className='air'>{item.first_air_date}</p>    
                <p className='overrview'>
                  {item.overview && item.overview.length > 200
                    ? item.overview.slice(0, 200) + "..."
                    : item.overview}
                </p>
              </div>
            </div>
          </NextLink>
        ))}

        {activeTab === 'movies' && results.movies?.map((item) => (
          <NextLink key={item.id} href={`/movies/${item.id}`}>
            <div className="result-card">
              <Image 
                src={
                  item.poster_path || item.backdrop_path
                    ? `https://media.themoviedb.org/t/p/w94_and_h141_bestv2${item.poster_path || item.backdrop_path}`
                    : "/fallback.png"
                }
                alt={item.title || "Movie"}
                width={94} 
                height={141} 
              />
              <div className='tails'>
                <h2>{item?.title}</h2>
                <p className='air'>{item.release_date}</p>    
                <p className='overrview'>
                  {item.overview && item.overview.length > 200
                    ? item.overview.slice(0, 200) + "..."
                    : item.overview}
                </p>
              </div>
            </div>
          </NextLink>
        ))}

        {activeTab === 'people' && results.people?.map((item) => (
          <NextLink key={item.id} href={`/people/${item.id}`}>
            <div className="result-card">
              <Image 
                className='bothered'
                src={
                  item.profile_path 
                    ? `https://media.themoviedb.org/t/p/w90_and_h90_bestv2${item.profile_path}`
                    : "/4792944.png"
                }
                alt={item.name || "Person"}
                width={90}
                height={90}
              />
              <div className='tails'>
                <h2>{item?.name}</h2>
                <p>{item.known_for_department}</p>
              </div>
            </div>
          </NextLink>
        ))}

        {activeTab === 'keywords' && results.keywords?.map((item) => (
          <div key={item.id} className="result-card">
            <h4 className='key'>{item.name}</h4>
          </div>
        ))}

        {query && !loading && (
          activeTab === 'tv' && results.tv.length === 0 ||
          activeTab === 'movies' && results.movies.length === 0 ||
          activeTab === 'people' && results.people.length === 0 ||
          activeTab === 'keywords' && results.keywords.length === 0
        ) && (
          <div className="no-results">
            <p>No {activeTab} found for &quot;{query}&quot;</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Main component with Suspense wrapper
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="loading">Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  );
}