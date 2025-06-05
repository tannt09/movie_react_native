// LIB
import {configureStore} from '@reduxjs/toolkit';

// IMPORT
import homeReducer from './Slice/HomeSlice';
import videoReducer from './Slice/VideoSlice';
import exploreReducer from './Slice/ExploreSlice';

const store = configureStore({
  reducer: {
    home: homeReducer,
    video: videoReducer,
    explore: exploreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
