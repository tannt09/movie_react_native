// LIB
import {configureStore} from '@reduxjs/toolkit';

// IMPORT
import homeReducer from './Slice/HomeSlice';

const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
