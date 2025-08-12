import axios from 'axios';

export const config = {
   baseUrl: 'https://api.themoviedb.org',
   token: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjQ0YzkzNjk3MzcyYzk5ZDY5YjU5MjYyY2I2NjhkMCIsIm5iZiI6MTc1MTI5Mjg2NC42NTkwMDAyLCJzdWIiOiI2ODYyOWJjMGMwN2QyZTVjZjAzMDQ4MzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZosBHSGmiHBXFEgyml673qLAEg5JbfUXfaiCDZxvjuk',
   subUrl: {
      // People
      popularPeople: '/3/person/popular',

      // Movie lists
      popularMovies: '/3/movie/popular',
      nowPlayingMovies: '/3/movie/now_playing',

      // Movie details
      movieDetails: '/3/movie',

      // TV lists
      discoveryTv: '/3/discover/tv',
      airingTodayTv: '/3/tv/airing_today',
      popularTv: '/3/tv/popular',
      

      // TV details
      tvDetails: '/3/tv'
   }
};

const tmdbApi = axios.create({
   baseURL: config.baseUrl,
});

tmdbApi.interceptors.request.use(
   async (requestConfig) => {
      try {
         requestConfig.headers = {
            ...requestConfig.headers,
            Authorization: `Bearer ${config.token}`,
            'Content-Type': 'application/json',
         };
      } catch (error) {
         console.log('Error adding token:', error);
      }

      return requestConfig;
   },
   (error) => Promise.reject(error)
);

export default tmdbApi;
