
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { contact } from './ContactApi';

const initialState = {
  status: 'idle',
  success: false,
  error: null,

};

export const createContactAsync = createAsyncThunk('create/createContactAsync', async (data) => {
  const contactData = await contact(data);
  return contactData;
});

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetFormStatus: (state) => {
      state.status = 'idle';
      state.success = false;
      state.error = null;
      state.contactResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContactAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createContactAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.success = true;
        state.contactResponse = action.payload;
      })
      .addCase(createContactAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const {
  resetFormStatus,
} = contactSlice.actions;

export const selectContactStatus = (state) => state.contact.status;
export const selectContactSuccess = (state) => state.contact.success;
export const selectContactError = (state) => state.contact.error;


export default contactSlice.reducer;
