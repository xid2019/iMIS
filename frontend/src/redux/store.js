import { configureStore } from '@reduxjs/toolkit';
import poFilterWindowReducer from './poFilterWindowSlice';

export const store = configureStore({
  reducer: {
    poFilterWindow: poFilterWindowReducer,
  },
});