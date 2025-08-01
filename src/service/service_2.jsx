'use client';
import { useEffect } from 'react';
import axios from 'axios';

export const config = {
    baseUrl : 'https://api.themoviedb.org',
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjQ0YzkzNjk3MzcyYzk5ZDY5YjU5MjYyY2I2NjhkMCIsIm5iZiI6MTc1MTI5Mjg2NC42NTkwMDAyLCJzdWIiOiI2ODYyOWJjMGMwN2QyZTVjZjAzMDQ4MzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZosBHSGmiHBXFEgyml673qLAEg5JbfUXfaiCDZxvjuk',
    subUrl: {
        populaPeople: '/3/person/popular',
        movies: '/3/movie/popular',
        tvshows:'/3/discover/tv',
    }

}