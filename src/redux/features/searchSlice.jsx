
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_KEY = 'eyJhbGciOiJIUzI1NiJ9eyJhdWQiOiI5MjQ0YzkzNjk3MzcyYzk5ZDY5YjU5MjYyY2I2NjhkMCIsIm5iZiI6MTc1MTI5Mjg2NC42NTkwMDAyLCJzdWIiOiI2ODYyOWJjMGMwN2QyZTVjZjAzMDQ4MzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0ZosBHSGmiHBXFEgyml673qLAEg5JbfUXfaiCDZxvjuk';
const BASE_URL = 'https://api.themoviedb.org/3';


export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (query, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/multi`, {
        params: {
          api_key: API_KEY,
          query,
        },
      });
      return response.data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.results = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.results = action.payload;
        state.loading = false;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch search results';
        state.loading = false;
      });
  },
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
