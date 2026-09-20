import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  order: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    clearOrder: (state) => {
      state.order = null;
    }
  },
});

export const { setOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;