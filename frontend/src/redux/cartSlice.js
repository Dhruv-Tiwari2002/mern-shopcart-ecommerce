import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage if it exists
const initialState = {
  cartItems: localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((x) => x._id === item._id);

      if (existingItem) {
        // Update the item with the new exact quantity from the dropdown
        state.cartItems = state.cartItems.map((x) => 
          x._id === existingItem._id ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
      // Save to browser storage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      // Filter out the item that matches the ID we want to delete
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      // Update browser storage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;