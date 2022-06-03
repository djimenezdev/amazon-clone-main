import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: [],
  },
  reducers: {
    allOrders: (state, action) => {
      state.order = [...action.payload.items];
    },
  },
});

export const { allOrders } = orderSlice.actions;

// selectors
export const getOrders = (state) => state.order.order;

export default orderSlice.reducer;
