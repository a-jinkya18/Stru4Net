// src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Dummy “login” thunk — replace with real API call later
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password, role }) => {
    // For MVP: accept any password if username matches role
    if (
      (role === 'admin' && username === 'admin') ||
      (role === 'user' && username === 'user')
    ) {
      return { username, role, token: 'fake-jwt-token' };
    }
    throw new Error('Invalid credentials');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    role: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = state.token = state.role = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(login.pending, (s) => {
      s.loading = true;
      s.error = null;
    })
      .addCase(login.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.username;
        s.role = a.payload.role;
        s.token = a.payload.token;
      })
      .addCase(login.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
