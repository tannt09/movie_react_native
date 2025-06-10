// LIB
import {Alert} from 'react-native';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

// IMPORT
import {addMoviesApi, getMyListApi} from '@/api/myList';
import {MovieDetailModel} from '@/models/homeModels';
import {AddItemMoviesModel} from '@/models/myListModels';

interface MyListState {
  isLoading: boolean;
  movies: MovieDetailModel[];
  totalPage: number;
  error?: string;
}

const initialState: MyListState = {
  isLoading: false,
  movies: [],
  totalPage: 1,
};

export const fetchMyList = createAsyncThunk(
  'getMyList',
  async ({
    id,
    page,
    handleLoadMore,
  }: {
    id: number;
    page: number;
    handleLoadMore: () => void;
  }) => {
    try {
      const videos = await getMyListApi({id, page});

      return videos;
    } catch (err) {
      Alert.alert('Unable to load my list ', `${err}`);
    }
  },
);

export const addMoviesThunk = createAsyncThunk(
  'addMoviesToMyList',
  async (data: {id: number; items: AddItemMoviesModel[]}, {dispatch}) => {
    try {
      const response = await addMoviesApi(data);

      const results = response.results[0];
      if (results.success) {
        dispatch(fetchMyList({id: data.id, page: 1, handleLoadMore: () => {}}));
      }

      return response;
    } catch (err) {
      Alert.alert('Unable to add movies ', `${err}`);
    }
  },
);

const myListSlice = createSlice({
  name: 'myList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchMyList.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchMyList.fulfilled, (state, action) => {
        const {page, handleLoadMore} = action.meta.arg;
        const isLoadMore = page > 1 ? true : false;

        if (action.payload) {
          if (isLoadMore) {
            state.movies.push(...action.payload.items);
          } else {
            state.movies = action.payload.items;
          }

          handleLoadMore();
          state.totalPage = action.payload.total_pages;
        }

        state.isLoading = false;
      })
      .addCase(fetchMyList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.toString();
      })
      .addCase(addMoviesThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(addMoviesThunk.fulfilled, (state, action) => {
        const results = action.payload?.results[0];
        if (results && !results.success) {
          state.error =
            results.error && results.error.length > 0
              ? results.error[0]
              : undefined;
        }

        state.isLoading = false;
      })
      .addCase(addMoviesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.toString();
      });
  },
});

export default myListSlice.reducer;
