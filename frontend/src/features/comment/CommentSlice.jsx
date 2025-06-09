import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addComments, fetchComments } from './commentApi';


// Create new comment
export const addCommentAsync = createAsyncThunk(
  'comments/addCommentAsync',
  async (data) => {
    const response = await addComments(data);
    return response;
  }
);

// Fetch all comments
export const fetchAllComments = createAsyncThunk(
  'comments/fetchAllComments',
  async () => {
    const response = await fetchComments();
    return response;
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    clearCommentsState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCommentAsync.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.comments.push(action.payload);
      })
      .addCase(addCommentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchAllComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload; 
      })
      .addCase(fetchAllComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearCommentsState } = commentSlice.actions;

// Selectors
export const selectComments = (state) => state.comments.comments;
export const selectCommentsLoading = (state) => state.comments.loading;
export const selectCommentsSuccess = (state) => state.comments.success;
export const selectCommentsError = (state) => state.comments.error;

export default commentSlice.reducer;
