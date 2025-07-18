import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './features/moviesSlice';
import searchReducer from './features/searchSlice';

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        search: searchReducer,
    },
});

export default store