
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { contact, getAllContacts } from './ContactApi';

const initialState = {
  status: 'idle',
  success: false,
  error: null,

};

export const createContactAsync = createAsyncThunk('create/createContactAsync', async (data) => {
  const contactData = await contact(data);
  return contactData;
});
export const fetchAllContactsAsync = createAsyncThunk('contact/fetchAllContactsAsync',async () => {
      const contacts = await getAllContacts();
      return contacts    
  }
);

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
      })
          .addCase(fetchAllContactsAsync.pending, (state) => {
        state.fetchStatus = 'loading';
        state.fetchError = null;
      })
      .addCase(fetchAllContactsAsync.fulfilled, (state, action) => {
        state.fetchStatus = 'fulfilled';
        state.allContacts = action.payload.data; // assuming response = { success, data }
      })
      .addCase(fetchAllContactsAsync.rejected, (state, action) => {
        state.fetchStatus = 'rejected';
        state.fetchError = action.payload;
      });
  },
});

export const {
  resetFormStatus,
} = contactSlice.actions;

export const selectContactStatus = (state) => state.contact.status;
export const selectContactSuccess = (state) => state.contact.success;
export const selectContactError = (state) => state.contact.error;
export const selectAllContacts = (state) => state.contact.allContacts;
export const selectFetchStatus = (state) => state.contact.fetchStatus;


export default contactSlice.reducer;
