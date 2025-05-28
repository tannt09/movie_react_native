// LIB
import {Alert} from 'react-native';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

// IMPORT
import {getMovieDetail, getMovies} from '@/api/home';
import {MovieDetailModel} from '@/models/homeModels';

interface HomeState {
  movieDetail?: MovieDetailModel;
  nowPlayMovies?: MovieDetailModel[];
  topRatedMovies?: MovieDetailModel[];
  isLoading: boolean;
  error?: string;
}

const initialState: HomeState = {
  isLoading: false,
};

export const fetchMovieDetail = createAsyncThunk(
  'getMovieDetail',
  async (id: number) => {
    try {
      const movie = await getMovieDetail({id});

      return movie;
    } catch (err) {
      Alert.alert('Unable to load movie details ', `${err}`);
    }
  },
);

export const fetchMovies = createAsyncThunk(
  'getMovies',
  async ({page, endpoint}: {page: number; endpoint: string}) => {
    try {
      const movies = await getMovies({page, endpoint});

      return movies;
    } catch (err) {
      Alert.alert('Unable to load now play movies ', `${err}`);
    }
  },
);

const homeSlice = createSlice({
  name: 'home',
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
      })
      .addCase(fetchMovies.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        switch (action.meta.arg.endpoint) {
          case 'now_playing':
            state.nowPlayMovies = action.payload?.results;
          case 'top_rated':
            state.topRatedMovies = action.payload?.results;
          default:
            console.log('No action matched.');
        }
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.toString();
      });
  },
});

export default homeSlice.reducer;
