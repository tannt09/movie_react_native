// LIB
import {Alert} from 'react-native';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

// IMPORT
import {MovieDetailModel} from '@/models/homeModels';
import {getSearchMoviesApi} from '@/api/explore';
import {isNullOrEmpty} from '@/utils/checkEmpty';

interface ExploreState {
  isLoading: boolean;
  exploreMovies: MovieDetailModel[];
  totalPage: number;
  error?: string;
}

const initialState: ExploreState = {
  isLoading: false,
  exploreMovies: [],
  totalPage: 1,
};

export const fetchSearchMovies = createAsyncThunk(
  'getSearchMovies',
  async ({
    page,
    searchText,
    handleLoadMore,
  }: {
    page: number;
    searchText: string;
    handleLoadMore: () => void;
  }) => {
    try {
      const movies = await getSearchMoviesApi({
        page,
        searchText: isNullOrEmpty(searchText) ? 'a' : searchText,
      });

      return movies;
    } catch (error) {
      Alert.alert('Unable to load search movies ', `${error}`);
    }
  },
);

const exploreSlice = createSlice({
  name: 'explore',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSearchMovies.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        const {page, handleLoadMore} = action.meta.arg;
        const isLoadMore = page > 1 ? true : false;

        if (action.payload) {
          if (isLoadMore) {
            state.exploreMovies.push(...action.payload.results);
          } else {
            state.exploreMovies = action.payload.results;
          }

          handleLoadMore();
          state.totalPage = action.payload.total_pages;
        }
        state.isLoading = false;
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.error = action.error.toString();
        state.isLoading = false;
      });
  },
});

export default exploreSlice.reducer;
