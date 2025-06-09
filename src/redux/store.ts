// LIB
import {configureStore} from '@reduxjs/toolkit';

// IMPORT
import homeReducer from './Slice/HomeSlice';
import videoReducer from './Slice/VideoSlice';
import exploreReducer from './Slice/ExploreSlice';
import myListReducer from './Slice/MyListSlice';

const store = configureStore({
  reducer: {
    home: homeReducer,
    video: videoReducer,
    explore: exploreReducer,
    myList: myListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
