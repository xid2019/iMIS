import { configureStore } from '@reduxjs/toolkit';
import orderLinesReducer from './orderLinesSlice';
import filtersReducer from './filtersSlice';

export const store = configureStore({
  reducer: {
    orderLines: orderLinesReducer,
    filters: filtersReducer,
  },
});