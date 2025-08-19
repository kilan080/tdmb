'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; 
import NextLink from 'next/link';
import './searp.css';

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjQ0YzkzNjk3MzcyYzk5ZDY5YjU5MjYyY2I2NjhkMCIsIm5iZiI6MTc1MTI5Mjg2NC42NTkwMDAyLCJzdWIiOiI2ODYyOWJjMGMwN2QyZTVjZjAzMDQ4MzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZosBHSGmiHBXFEgyml673qLAEg5JbfUXfaiCDZxvjuk';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [activeTab, setActiveTab] = useState('tv');
  const [results, setResults] = useState({
    tv: [],
    movies: [],
    people: [],
    keywords: [],
  });

  const fetchResults = async () => {
    if (!query.trim()) return;

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
    }
  };

    useEffect(() => {
        fetchResults();
    }, [query]);


  return (
    <div className="both-container">
      <div className="search-tabs">
        <h3>Search Results</h3>
        <button onClick={() => setActiveTab('tv')}>TV Shows ({results.tv.length})</button>
        <button onClick={() => setActiveTab('movies')}>Movies ({results.movies.length})</button>
        <button onClick={() => setActiveTab('people')}>People ({results.people.length})</button>
        <button onClick={() => setActiveTab('keywords')}>Keywords ({results.keywords.length})</button>
      </div>

      <div className="search-results">
        {activeTab === 'tv' && results.tv?.map((item) => (
          <NextLink key={item.id} href={`/tvShows/${item.id}`} passHref>
            <div className="result-card" style={{ textDecoration: "none" }}>
              <img 
                src={
                  item.poster_path || item.backdrop_path
                    ? `https://media.themoviedb.org/t/p/w94_and_h141_bestv2${item.poster_path || item.backdrop_path}`
                    : "/fallback.png" // optional fallback image
                }
                alt={item.name}
              />
              <div className='tails'>
                <h2>{item.name}</h2>
                <p className='air'>{item.first_air_date}</p>    
                <p>
                  {item.overview && item.overview.length > 200
                    ? item.overview.slice(0, 200) + "..."
                    : item.overview}
                </p>
              </div>
            </div>
          </NextLink>
        ))}

        {activeTab === 'movies' && results.movies?.map((item) => (
          <NextLink key={item.id} href={`/movies/${item.id}`} passHref>
            <div key={item.id} className="result-card" style={{ textDecoration: "none" }}>
              <img src={`https://media.themoviedb.org/t/p/w94_and_h141_bestv2${item.poster_path || item.backdrop_path}`} alt={item.title} />
              <div className='tails'>
                <h2>{item?.title}</h2>
                <p className='air'>{item.release_date}</p>    
                <p>
                  {item.overview && item.overview.length > 200
                    ? item.overview.slice(0, 200) + "..."
                    : item.overview}
                </p>
              </div>
            </div>
          </NextLink>
        ))}

        {activeTab === 'people' && results.people?.map((item) => (
          <NextLink key={item.id} href={`/people/${item.id}`} passHref>
            <div className="result-card" style={{ textDecoration: "none" }}>
              <img className='bothered'
                src={
                  item.profile_path === null ? './4792944.png' : `https://media.themoviedb.org/t/p/w90_and_h90_bestv2${item.profile_path}`
                }
                alt={item.name || "Unknown Actor"}
              />
              <div className='tails'>
                <h2>{item?.name}</h2>
                <p>{item.known_for_department} .</p>
              </div>
            </div>
          </NextLink>
        ))}

        {activeTab === 'keywords' && results.keywords?.map((item) => (
          <div key={item.id} className="result-card">
            <h4 className='key'>{item.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
