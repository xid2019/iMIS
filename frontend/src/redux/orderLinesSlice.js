import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrderLines = createAsyncThunk(
  'orderLines/fetchOrderLines',
  async (filters) => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await axios.get(`http://localhost:8000/orders/?${queryParams}`);
    return response.data;
  }
);

export const updateOrderLine = createAsyncThunk(
  'orderLines/updateOrderLine',
  async (updatedData) => {
    await axios.put(`http://localhost:8000/order_lines/update/${updatedData.orderline_id}/`, updatedData);
    return updatedData; // Assuming the updatedData is successfully saved
  }
);

export const deleteOrderLine = createAsyncThunk(
  'orderLines/deleteOrderLine',
  async (orderline_id) => {
    await axios.delete(`http://localhost:8000/order_lines/delete/${orderline_id}/`);
    return orderline_id; // Return the deleted order line's ID
  }
);

const orderLinesSlice = createSlice({
  name: 'orderLines',
  initialState: {
    data: [],
    staticArr: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setEditMode: (state, action) => {
      const { index, editMode } = action.payload;
      state.staticArr[index] = !editMode; // Toggle edit mode for the row
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderLines.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderLines.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.staticArr = new Array(action.payload.length).fill(true);
      })
      .addCase(fetchOrderLines.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateOrderLine.fulfilled, (state, action) => {
        const index = state.data.findIndex((item) => item.orderline_id === action.payload.orderline_id);
        if (index !== -1) {
          state.data[index] = action.payload; // Update the data
          state.staticArr[index] = true; // Switch back to static mode after save
        }
      })
      .addCase(deleteOrderLine.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.orderline_id !== action.payload);
      });
  },
});

export const { setEditMode } = orderLinesSlice.actions;
export default orderLinesSlice.reducer;