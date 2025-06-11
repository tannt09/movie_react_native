// LIB
import {Alert} from 'react-native';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

// IMPORT
import {getMovieDetailApi, getMoviesApi} from '@/api/home';
import {MovieDetailModel} from '@/models/homeModels';

const delay = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

interface HomeState {
  movieDetail?: MovieDetailModel;
  movies: MovieDetailModel[][];
  isLoadingDetail: boolean;
  isLoading: boolean[];
  error?: string;
  page: number[];
  totalPage: number[];
}

const initialState: HomeState = {
  movies: Array(4)
    .fill(null)
    .map(() => []),
  isLoadingDetail: false,
  isLoading: Array(4).fill(false),
  page: Array(4).fill(1),
  totalPage: Array(4).fill(1),
};

type EndpointType = 'now_playing' | 'top_rated' | 'upcoming' | 'popular';

const valueKeyMap: Record<EndpointType, number> = {
  now_playing: 0,
  top_rated: 1,
  upcoming: 2,
  popular: 3,
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
  async ({page, endpoint}: {page: number; endpoint: string}, {dispatch}) => {
    try {
      const movies = await getMoviesApi({page, endpoint});

      dispatch(increasePage(valueKeyMap[endpoint as EndpointType]));

      return movies;
    } catch (err) {
      Alert.alert('Unable to load now play movies ', `${err}`);
    }
  },
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    increasePage: (state, action: PayloadAction<number>) => {
      state.page[action.payload] = state.page[action.payload] + 1;
    },
  },
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
        const valueKey = valueKeyMap[endpoint as EndpointType];

        state.isLoading[valueKey] = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const {page, endpoint} = action.meta.arg;
        const isLoadMore = page > 1 ? true : false;

        const valueKey = valueKeyMap[endpoint as EndpointType];

        if (action.payload) {
          if (isLoadMore) {
            const movieList = state.movies[valueKey];
            movieList.push(...action.payload.results);
          } else {
            state.movies[valueKey] = action.payload.results;
          }
          state.totalPage[valueKey] = action.payload.total_pages;
        }

        state.isLoading[valueKey] = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        const {endpoint} = action.meta.arg;
        const valueKey = valueKeyMap[endpoint as EndpointType];

        state.isLoading[valueKey] = false;
        state.error = action.error.toString();
      });
  },
});

export const {increasePage} = homeSlice.actions;
export default homeSlice.reducer;
