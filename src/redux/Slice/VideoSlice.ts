// LIB
import {Alert} from 'react-native';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

// IMPORT
import {getTrailerVideoApi} from '@/api/video';
import {VideoModel} from '@/models/videoModels';

export interface VideoState {
  isLoading: boolean;
  videos: VideoModel[];
  error?: string;
}

const initialState: VideoState = {
  isLoading: false,
  videos: [],
};

export const fetchTrailerVideo = createAsyncThunk(
  'getTrailerVideo',
  async ({id}: {id: number}) => {
    try {
      const videos = await getTrailerVideoApi({id});

      return videos;
    } catch (err) {
      Alert.alert('Unable to load trailer videos ', `${err}`);
    }
  },
);

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTrailerVideo.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchTrailerVideo.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.videos = action.payload?.results;
        state.isLoading = false;
      })
      .addCase(fetchTrailerVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.toString();
      });
  },
});

export default videoSlice.reducer;
