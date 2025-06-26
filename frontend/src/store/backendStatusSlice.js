
import { createSlice } from '@reduxjs/toolkit';

const backendStatusSlice = createSlice({
  name: 'backendStatus',
  initialState: {
    backendDown: false,
  },
  reducers: {
    setBackendDown: (state, action) => {
      state.backendDown = action.payload;
    },
  },
});

export const  setBackendDown  = backendStatusSlice.actions;

export const selectBackendDown = (state) => state.backendStatus.backendDown;

export default backendStatusSlice.reducer;
