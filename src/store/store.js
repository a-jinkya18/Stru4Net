// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import bridgeReducer from '../features/bridgeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bridge: bridgeReducer,
  },
});
