import { configureStore } from '@reduxjs/toolkit';
import poFilterWindowReducer from './poFilterWindowSlice';
import poEntryWindowReducer from './poEntryWindowSlice';
import invoiceWindow from './invoiceWindow';

export const store = configureStore({
  reducer: {
    poFilterWindow: poFilterWindowReducer,
    poEntryWindow: poEntryWindowReducer,
    invoiceWindow: invoiceWindow,
  },
});