import { configureStore } from '@reduxjs/toolkit';
import poFilterWindowReducer from './poFilterWindowSlice';
import poEntryWindowReducer from './poEntryWindowSlice';

export const store = configureStore({
  reducer: {
    poFilterWindow: poFilterWindowReducer,
    poEntryWindow: poEntryWindowReducer,
  },
});