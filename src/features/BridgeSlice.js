import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBridgeData = createAsyncThunk('bridge/fetchBridgeData', async () => {
  const response = await axios.get('https://stru4net.s3.eu-north-1.amazonaws.com/data.json');
  return response.data;
});

const bridgeSlice = createSlice({
  name: 'bridge',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBridgeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBridgeData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBridgeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bridgeSlice.reducer;
