import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  productDetails: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { setProducts, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;