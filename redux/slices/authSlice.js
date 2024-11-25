import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userInfo: {
    name: 'John Doe', // Kullanıcının adı
    email: 'john.doe@example.com', // Kullanıcının e-posta adresi
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload; // user ınfo setle
    },
    logout(state) {
      state.user = null; // Reset user session
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
