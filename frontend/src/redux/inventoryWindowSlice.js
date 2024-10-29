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
    await axios.delete(`http://localhost:8000/inventories/inventory_items/delete/${inventory_item_id}/`);
    return inventory_item_id; 
  }
);

export const fetchInventoryRecords = createAsyncThunk(
  'inventoryWindow/fetchInventoryRecords',
  async (inventory_item_id) => {
    const response = await axios.get(`http://localhost:8000/inventories/inventory_records/${inventory_item_id}/`);
    return response.data; 
  }
);

export const updateInventoryItem = createAsyncThunk(
  'inventoryWindow/updateInventoryItem',
  async (updatedData) => {
    await axios.put(`http://localhost:8000/inventories/inventory_items/update/${updatedData.id}/`, updatedData);
    return updatedData; 
  }
);

export const createInventoryItem = createAsyncThunk(
  'inventoryWindow/createInventoryItem',
  async (data) => {
    await axios.post("http://localhost:8000/inventories/inventory_items/create/", data);
    return data; 
  }
);

export const addInventoryRecord = createAsyncThunk(
  'inventoryWindow/addInventoryRecord',
  async ({inventoryItemId, newRecord}) => {
    const response = await axios.post(
      `http://localhost:8000/inventories/inventory_records/create/${inventoryItemId}/`,
      newRecord
    );
    return { inventoryItemId, newRecord: response.data }; // Send back both the item ID and the new record data
  }
);

export const deleteInventoryRecord = createAsyncThunk(
  'inventoryWindow/deleteInventoryRecord',
  async (recordId) => {
    await axios.delete(`http://localhost:8000/inventories/inventory_records/delete/${recordId}/`);
    return recordId;
  }
);

export const applyFilters = createAsyncThunk(
  'inventoryWindow/fetchAndApplyFilters',
  async ({ partNumberFilter, minInventoryActive, maxInventoryActive }, { dispatch, getState }) => {
    await dispatch(fetchInventoryItems());
    const { data } = getState().inventoryWindow;
    const filteredData = data.filter((row) => {
      const meetsPartNumber = !partNumberFilter || row.part_number.toLowerCase().includes(partNumberFilter.toLowerCase());
      const meetsMinInventory = !minInventoryActive || row.quantity < row.min_inventory;
      const meetsMaxInventory = !maxInventoryActive || row.quantity > row.max_inventory;

      return meetsPartNumber && meetsMinInventory && meetsMaxInventory;
    });
    return filteredData;
  }
);

const InventoryWindowSlice = createSlice({
  name: 'inventoryWindow',
  initialState: {
    data: [],
    staticArr: [],
    error: null,
  },
  reducers: {
    setEditMode: (state, action) => {
      const { index, editMode } = action.payload;
      state.staticArr[index] = !editMode;
    },
    updateInventoryItem: (state, action) => {
      const {index, updatedInventoryItem} = action.payload;
      state.data[index] = updatedInventoryItem;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventoryItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInventoryItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.staticArr = new Array(action.payload.length).fill(true);
      })
      .addCase(fetchInventoryItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateInventoryItem.fulfilled, (state, action) => {
        const index = state.data.findIndex((item) => item.orderline_id === action.payload.orderline_id);
        if (index !== -1) {
          state.data[index] = action.payload;
          state.staticArr[index] = true;
        }
      })
      .addCase(deleteInventoryItem.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.orderline_id !== action.payload);
      })
      .addCase(applyFilters.fulfilled, (state, action) => {
        state.data = action.payload;
        state.staticArr = action.payload.map(() => true);
      });
  },
});

export default InventoryWindowSlice.reducer;