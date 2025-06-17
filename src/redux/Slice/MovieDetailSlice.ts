// LIB
import {Alert} from 'react-native';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

// IMPORT
import {MovieDetailModel} from '@/models/homeModels';
import {getMovieDetailApi} from '@/api/home';

interface MovieDetailState {
  movieDetail?: MovieDetailModel;
  isLoading: boolean;
  error?: string;
}

const initialState: MovieDetailState = {
  isLoading: false,
};

export const fetchMovieDetail = createAsyncThunk(
  'getMovieDetail',
  async (id: number) => {
    try {
      const movie = await getMovieDetailApi({id});

      return movie;
    } catch (err) {
      Alert.alert('Unable to load movie details ', `${err}`);
    }
  },
);

const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMovieDetail.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movieDetail = action.payload;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.toString();
      });
  },
});

export default movieDetailSlice.reducer;
