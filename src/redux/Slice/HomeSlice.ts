// LIB
import {Alert} from 'react-native';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

// IMPORT
import {getMovieDetail, getMovies} from '@/api/home';
import {MovieDetailModel} from '@/models/homeModels';

const delay = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

interface HomeState {
  movieDetail?: MovieDetailModel;
  nowPlayMovies?: MovieDetailModel[];
  topRatedMovies?: MovieDetailModel[];
  upcomingMovies?: MovieDetailModel[];
  popularMovies?: MovieDetailModel[];
  isLoadingDetail: boolean;
  isLoadingNowPlayMovies: boolean;
  isLoadingTopRatedMovies: boolean;
  isLoadingUpcomingMovies: boolean;
  isLoadingPopularMovies: boolean;
  error?: string;
}

const initialState: HomeState = {
  isLoadingDetail: false,
  isLoadingNowPlayMovies: false,
  isLoadingTopRatedMovies: false,
  isLoadingUpcomingMovies: false,
  isLoadingPopularMovies: false,
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
        state.isLoadingDetail = true;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.isLoadingDetail = false;
        state.movieDetail = action.payload;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.isLoadingDetail = false;
        state.error = action.error.toString();
      })
      .addCase(fetchMovies.pending, (state, action) => {
        switch (action.meta.arg.endpoint) {
          case 'now_playing':
            state.isLoadingNowPlayMovies = true;
            break;
          case 'top_rated':
            state.isLoadingTopRatedMovies = true;
            break;
          case 'upcoming':
            state.isLoadingUpcomingMovies = true;
            break;
          case 'popular':
            state.isLoadingPopularMovies = true;
            break;
          default:
            console.log('No action matched. ');
        }
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        switch (action.meta.arg.endpoint) {
          case 'now_playing':
            state.nowPlayMovies = action.payload?.results;
            state.isLoadingNowPlayMovies = false;
            break;
          case 'top_rated':
            state.topRatedMovies = action.payload?.results;
            state.isLoadingTopRatedMovies = false;
            break;
          case 'upcoming':
            state.upcomingMovies = action.payload?.results;
            state.isLoadingUpcomingMovies = false;
            break;
          case 'popular':
            state.popularMovies = action.payload?.results;
            state.isLoadingPopularMovies = false;
            break;
          default:
            state.isLoadingNowPlayMovies = false;
            state.isLoadingTopRatedMovies = false;
            state.isLoadingUpcomingMovies = false;
            state.isLoadingPopularMovies = false;
            console.log('No action matched. ');
        }
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoadingNowPlayMovies = false;
        state.isLoadingTopRatedMovies = false;
        state.isLoadingUpcomingMovies = false;
        state.isLoadingPopularMovies = false;
        state.error = action.error.toString();
      });
  },
});

export default homeSlice.reducer;
