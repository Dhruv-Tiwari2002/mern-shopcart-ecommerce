import { createSlice } from '@reduxjs/toolkit';

// Check if user data exists in local storage so they stay logged in after refreshing
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      // Save the token and user data to the browser
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      // Clear the browser storage on logout
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;