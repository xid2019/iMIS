import { configureStore } from '@reduxjs/toolkit';
import poFilterWindowReducer from './poFilterWindowSlice';
import poEntryWindowReducer from './poEntryWindowSlice';
import invoiceWindowReducer from './invoiceWindowSlice';
import inventoryWindowReducer from './inventoryWindowSlice';

export const store = configureStore({
  reducer: {
    poFilterWindow: poFilterWindowReducer,
    poEntryWindow: poEntryWindowReducer,
    invoiceWindow: invoiceWindowReducer,
    inventoryWindow: inventoryWindowReducer,
  },
});