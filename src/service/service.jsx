'use client';
import { useEffect } from 'react';
import axios from 'axios';

// export const config = {
//     baseUrl : 'https://api.themoviedb.org',
//     subUrl: {
//         populaPeople: '/3/person/popular',
//         movies: '/3/movie/popular',
//         tvshows:'/3/discover/tv',
//     }

// }

import React, { useState } from 'react'

export default function Service({subUrl}) {

    const [movies, setMovies] = useState([]);
    const url = subUrl ? `https://api.themoviedb.org${subUrl}` : 'https://api.themoviedb.org';
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjQ0YzkzNjk3MzcyYzk5ZDY5YjU5MjYyY2I2NjhkMCIsIm5iZiI6MTc1MTI5Mjg2NC42NTkwMDAyLCJzdWIiOiI2ODYyOWJjMGMwN2QyZTVjZjAzMDQ4MzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZosBHSGmiHBXFEgyml673qLAEg5JbfUXfaiCDZxvjuk';
    const fetchMovies = async () => {
        try {
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },  
            });
            const data = res.data;
            setMovies(data.results || []);
        } catch(error) {
            console.error('error fetching data', error)
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    return (
        <div>
            <h2>service</h2>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>{movie.title || movie.name}</li>
                ))}
            </ul>
        </div>
    )
}
