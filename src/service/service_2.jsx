import axios from 'axios';

export const config = {
   baseUrl: 'https://api.themoviedb.org',
   token: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjQ0YzkzNjk3MzcyYzk5ZDY5YjU5MjYyY2I2NjhkMCIsIm5iZiI6MTc1MTI5Mjg2NC42NTkwMDAyLCJzdWIiOiI2ODYyOWJjMGMwN2QyZTVjZjAzMDQ4MzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZosBHSGmiHBXFEgyml673qLAEg5JbfUXfaiCDZxvjuk',
   subUrl: {
      popularPeople: '/3/person/popular',
      movies: '/3/movie/popular',
      tvshows: '/3/discover/tv',
      tv: '/3/tv',
      discoveryTv: '/3/discover/tv',
      airingToday: '/3/tv/airing_today',
      nowPlaying: '/3/movie/now_playing',
   },
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
