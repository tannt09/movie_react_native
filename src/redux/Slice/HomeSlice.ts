// LIB
import {Alert} from 'react-native';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

// IMPORT
import {getMovieDetailApi, getMoviesApi} from '@/api/home';
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
  totalPage: number;
}

const initialState: HomeState = {
  isLoadingDetail: false,
  isLoadingNowPlayMovies: false,
  isLoadingTopRatedMovies: false,
  isLoadingUpcomingMovies: false,
  isLoadingPopularMovies: false,
  totalPage: 1,
};

type EndpointType = 'now_playing' | 'top_rated' | 'upcoming' | 'popular';

const movieKeyMap: Record<
  EndpointType,
  keyof Pick<
    HomeState,
    'nowPlayMovies' | 'topRatedMovies' | 'upcomingMovies' | 'popularMovies'
  >
> = {
  now_playing: 'nowPlayMovies',
  top_rated: 'topRatedMovies',
  upcoming: 'upcomingMovies',
  popular: 'popularMovies',
};

const loadingKeyMap: Record<
  EndpointType,
  keyof Pick<
    HomeState,
    | 'isLoadingNowPlayMovies'
    | 'isLoadingTopRatedMovies'
    | 'isLoadingUpcomingMovies'
    | 'isLoadingPopularMovies'
  >
> = {
  now_playing: 'isLoadingNowPlayMovies',
  top_rated: 'isLoadingTopRatedMovies',
  upcoming: 'isLoadingUpcomingMovies',
  popular: 'isLoadingPopularMovies',
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

export const fetchMovies = createAsyncThunk(
  'getMovies',
  async ({
    page,
    endpoint,
    handleLoadMore,
  }: {
    page: number;
    endpoint: string;
    handleLoadMore?: () => void;
  }) => {
    try {
      const movies = await getMoviesApi({page, endpoint});

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
        const {endpoint} = action.meta.arg;
        const loadingKey = loadingKeyMap[endpoint as EndpointType];

        state[loadingKey] = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const {page, endpoint, handleLoadMore} = action.meta.arg;
        const checkLoadMore = page > 1 ? true : false;

        const movieKey = movieKeyMap[endpoint as EndpointType];
        const loadingKey = loadingKeyMap[endpoint as EndpointType];

        if (action.payload) {
          if (handleLoadMore) {
            handleLoadMore();
          }
          if (checkLoadMore) {
            const movieList = state[movieKey] as MovieDetailModel[];
            movieList.push(...action.payload.results);
          } else {
            state[movieKey] = action.payload.results;
          }
          state.totalPage = action.payload.total_pages;
        }

        state[loadingKey] = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        const {endpoint} = action.meta.arg;
        const loadingKey = loadingKeyMap[endpoint as EndpointType];

        state[loadingKey] = false;
        state.error = action.error.toString();
      });
  },
});

export default homeSlice.reducer;
