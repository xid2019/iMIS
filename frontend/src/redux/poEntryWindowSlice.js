import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addOrder = createAsyncThunk(
  'poEntryWindow/addOrder',
  async (data) => {
    await axios.post("http://localhost:8000/orders/create/", data);
    return data; 
  }
);

const POEntryWindowSlice = createSlice({
  name: 'poEntryWindow',
  initialState: {
    data: [],
    staticArr: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setEditMode: (state, action) => {
      const { index, editMode } = action.payload;
      state.staticArr[index] = !editMode;
    },
    addOrderLineInTable: (state, action) => {
      const orderLine = action.payload;
      state.data.push(orderLine)
      state.staticArr.push(true);
    },
    updateOrderLineInTable: (state, action) => {
      const {index, updatedOrderLine} = action.payload;
      state.data[index] = updatedOrderLine;
    },
    deleteOrderLineInTable: (state, action) => {
      const index = action.payload;
      state.data.splice(index, 1);
      state.staticArr.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.fulfilled, (state) => {
        state.data = []
        state.staticArr = []
      })
  },
});

export default POEntryWindowSlice.reducer;