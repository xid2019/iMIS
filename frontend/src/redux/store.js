import { configureStore } from '@reduxjs/toolkit';
import orderLinesReducer from './orderLinesSlice';

export const store = configureStore({
  reducer: {
    orderLines: orderLinesReducer,
  },
});