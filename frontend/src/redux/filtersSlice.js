// redux/filtersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    customer_id: '',
    customer_po: '',
    order_date_after: '',
    order_date_before: '',
    required_date_after: '',
    required_date_before: '',
    status: '',
  },
  reducers: {
    setFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearFilters: () => {
      return {
        customer_id: '',
        customer_po: '',
        order_date_after: '',
        order_date_before: '',
        required_date_after: '',
        required_date_before: '',
        status: '',
      };
    },
  },
});

export const { setFilters, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;