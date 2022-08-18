import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  array: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder(state, action) {
      state.array = action.payload.array;
    },
  },
});

export default orderSlice;
