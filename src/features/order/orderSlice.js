import { createSlice } from "@reduxjs/toolkit";
const initialState = { order: [], currentOrder: null };
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder(state, action) {
      const newOrder = action.payload;
      state.order.push(newOrder);
      state.currentOrder = newOrder;
    },
    clearOrder(state) {
      state.order = [];
    },
  },
});
export const { addOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
