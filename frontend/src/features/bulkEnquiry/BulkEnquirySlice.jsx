import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bulkEnquiry, getAllBulkEnquiry } from './BulkEnquryApi';

const initialState = {
  status: 'idle',
  success: false,
  error: null,
  bulkResponse: null,
  fetchStatus: 'idle',
  fetchError: null,
  allBulkEnquiry: [],
};

// Create bulk enquiry
export const createBulkEnquiryAsync = createAsyncThunk(
  'bulkEnquiry/createBulkEnquiryAsync',
  async (data) => {
    const response = await bulkEnquiry(data);
    return response;
  }
);

// Fetch all bulk enquiries
export const fetchAllBulkEnquiryAsync = createAsyncThunk(
  'bulkEnquiry/fetchAllBulkEnquiryAsync',
  async () => {
    const response = await getAllBulkEnquiry();
    return response.data; 
  }
);

const BulkEnquirySlice = createSlice({
  name: 'bulkEnquiry',
  initialState,
  reducers: {
    resetFormStatus: (state) => {
      state.status = 'idle';
      state.success = false;
      state.error = null;
      state.bulkResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBulkEnquiryAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createBulkEnquiryAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.success = true;
        state.bulkResponse = action.payload;
      })
      .addCase(createBulkEnquiryAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllBulkEnquiryAsync.pending, (state) => {
        state.fetchStatus = 'loading';
        state.fetchError = null;
      })
      .addCase(fetchAllBulkEnquiryAsync.fulfilled, (state, action) => {
        state.fetchStatus = 'fulfilled';
        state.allBulkEnquiry = action.payload;
      })
      .addCase(fetchAllBulkEnquiryAsync.rejected, (state, action) => {
        state.fetchStatus = 'rejected';
        state.fetchError = action.error.message;
      });
  },
});

export const { resetFormStatus } = BulkEnquirySlice.actions;

export const selectBulkEnquiryStatus = (state) => state.bulkEnquiry.status;
export const selectBulkEnquirySuccess = (state) => state.bulkEnquiry.success;
export const selectBulkEnquiryError = (state) => state.bulkEnquiry.error;
export const selectAllBulkEnquiry = (state) => state.bulkEnquiry.allBulkEnquiry;
export const selectFetchStatus = (state) => state.bulkEnquiry.fetchStatus;
export const selectFetchError = (state) => state.bulkEnquiry.fetchError;

export default BulkEnquirySlice.reducer;
