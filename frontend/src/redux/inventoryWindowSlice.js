import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchInventoryItems = createAsyncThunk(
  'inventoryWindow/fetchInventoryItems',
  async () => {
    const response = await axios.get(`http://localhost:8000/inventories/`);
    return response.data;
  }
);

export const deleteInventoryItem = createAsyncThunk(
  'inventoryWindow/deleteInventoryItem',
  async (inventory_item_id) => {
    await axios.delete(`http://localhost:8000/inventory_items/delete/${inventory_item_id}/`);
    return inventory_item_id; 
  }
);

export const createInventoryItem = createAsyncThunk(
  'inventoryWindow/createInventoryItem',
  async (data) => {
    await axios.post("http://localhost:8000/inventories/inventory_items/create/", data);
    return data; 
  }
);

const InventoryWindowSlice = createSlice({
  name: 'inventoryWindow',
  initialState: {
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventoryItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInventoryItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchInventoryItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteInventoryItem.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.orderline_id !== action.payload);
      });
  },
});

export default InventoryWindowSlice.reducer;