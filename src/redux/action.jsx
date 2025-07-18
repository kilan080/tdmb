import { fetchTrendingMovies } from './features/moviesSlice';
import { fetchSearchResults } from './features/searchSlice';

export const getTrendingMovies = (dispatch) => {
  dispatch(fetchTrendingMovies());
};

export const getSearchResults = (dispatch) => {
    dispatch(fetchSearchResults(querry));
}