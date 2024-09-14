import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrderLine = createAsyncThunk(
  'invoiceWindow/fetchOrderLines',
  async (filters) => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await axios.get(`http://localhost:8000/order_lines/?${queryParams}`);
    return response.data;
  }
);

const InvoiceWindowSlice = createSlice({
  name: 'invoiceWindow',
  initialState: {
    orderLineData: [],
    orderLineStaticArr: [],
    extraChargeData: [],
    extraChargeStaticArr: [],
    addressData: {
      shipToAddressLine1: "",
			shipToAddressLine2: "",
			shipToAddressLine3: "",
			shipToAddressLine4: "",
			billToAddressLine1: "",
			billToAddressLine2: "",
			billToAddressLine3: "",
			billToAddressLine4: "",
    },
    customerId: "",
    error: null,
  },
  reducers: {
    setOrderLineEditMode: (state, action) => {
      const { index, editMode } = action.payload;
      state.orderLineStaticArr[index] = !editMode;
    },
    addOrderLineInTable: (state, action) => {
      const orderLine = action.payload;
      state.orderLineData.push(orderLine)
      state.orderLineStaticArr.push(true);
    },
    updateOrderLineInTable: (state, action) => {
      const {index, updatedOrderLine} = action.payload;
      state.orderLineData[index] = updatedOrderLine;
    },
    deleteOrderLineInTable: (state, action) => {
      const index = action.payload;
      state.orderLineData.splice(index, 1);
      state.orderLineStaticArr.splice(index, 1);
    },
    setExtraChargeEditMode: (state, action) => {
      const { index, editMode } = action.payload;
      state.extraChargeStaticArr[index] = !editMode;
    },
    addExtraChargeInTable: (state, action) => {
      const extraCharge = action.payload;
      state.extraChargeData.push(extraCharge)
      state.extraChargeStaticArr.push(true);
    },
    updateExtraChargeInTable: (state, action) => {
      const {index, updatedOrderLine} = action.payload;
      state.extraChargeData[index] = updatedOrderLine;
    },
    deleteExtraChargeInTable: (state, action) => {
      const index = action.payload;
      state.extraChargeData.splice(index, 1);
      state.extraChargeStaticArr.splice(index, 1);
    },
    updateAddressData: (state, action) => {
      const updateAddressData = action.payload;
      state.addressData = updateAddressData;
    },
    updateCustomerId: (state, action) => {
      const customerId = action.payload;
      state.customerId = customerId;
    },
  },
});

export default InvoiceWindowSlice.reducer;