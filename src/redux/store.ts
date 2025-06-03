// LIB
import {configureStore} from '@reduxjs/toolkit';

// IMPORT
import homeReducer from './Slice/HomeSlice';
import videoReducer from './Slice/VideoSlice';

const store = configureStore({
  reducer: {
    home: homeReducer,
    video: videoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
