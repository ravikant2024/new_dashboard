import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  addBlog, deleteBlogById, fetchAllBlogs, updateBlogById } from './BlogApi';

const initialState = {
  blogs: [],
  status: 'idle',
  blogAddStatus: 'idle',
  blogDeleteStatus: 'idle',
  blogUpdateStatus: 'idle',
  blogFetchStatus: 'idle',
  errors: null,
  successMessage: null,
};

// Thunks
export const createBlogAsync = createAsyncThunk('blogs/createBlogAsync', async (blog) => {
  const createdBlog = await addBlog(blog);
  return createdBlog;
});

export const fetchAllBlogsAsync = createAsyncThunk('blogs/fetchAllBlogsAsync', async () => {
  const blogs = await fetchAllBlogs();
  return blogs;
});

export const updateBlogByIdAsync = createAsyncThunk('blogs/updateBlogByIdAsync', async (update) => {
  const updatedBlog = await updateBlogById(update);
  return updatedBlog;
});

export const deleteBlogByIdAsync = createAsyncThunk('blogs/deleteBlogByIdAsync', async (id) => {
  const deletedBlog = await deleteBlogById(id);
  return deletedBlog;
});

// Slice
const blogSlice = createSlice({
  name: 'blogSlice',
  initialState,
  reducers: {
    resetBlogAddStatus: (state) => {
      state.blogAddStatus = 'idle';
    },
    resetBlogDeleteStatus: (state) => {
      state.blogDeleteStatus = 'idle';
    },
    resetBlogUpdateStatus: (state) => {
      state.blogUpdateStatus = 'idle';
    },
    resetBlogFetchStatus: (state) => {
      state.blogFetchStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Create blog
      .addCase(createBlogAsync.pending, (state) => {
        state.blogAddStatus = 'pending';
      })
      .addCase(createBlogAsync.fulfilled, (state, action) => {
        state.blogAddStatus = 'fulfilled';
        state.blogs.push(action.payload);
      })
      .addCase(createBlogAsync.rejected, (state, action) => {
        state.blogAddStatus = 'rejected';
        state.errors = action.error;
      })

      // Fetch all blogs
      .addCase(fetchAllBlogsAsync.pending, (state) => {
        state.blogFetchStatus = 'pending';
      })
      .addCase(fetchAllBlogsAsync.fulfilled, (state, action) => {
        state.blogFetchStatus = 'fulfilled';
        state.blogs = action.payload;
      })
      .addCase(fetchAllBlogsAsync.rejected, (state, action) => {
        state.blogFetchStatus = 'rejected';
        state.errors = action.error;
      })

      // Update blog
      .addCase(updateBlogByIdAsync.pending, (state) => {
        state.blogUpdateStatus = 'pending';
      })
      .addCase(updateBlogByIdAsync.fulfilled, (state, action) => {
        state.blogUpdateStatus = 'fulfilled';
        const index = state.blogs.findIndex(blog => blog._id === action.payload._id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(updateBlogByIdAsync.rejected, (state, action) => {
        state.blogUpdateStatus = 'rejected';
        state.errors = action.error;
      })

      // Delete blog
      .addCase(deleteBlogByIdAsync.pending, (state) => {
        state.blogDeleteStatus = 'pending';
      })
      .addCase(deleteBlogByIdAsync.fulfilled, (state, action) => {
        state.blogDeleteStatus = 'fulfilled';
        state.blogs = state.blogs.filter(blog => blog._id !== action.payload._id);
      })
      .addCase(deleteBlogByIdAsync.rejected, (state, action) => {
        state.blogDeleteStatus = 'rejected';
        state.errors = action.error;
      });
  },
});

// Exporting selectors
export const selectBlogStatus = (state) => state.blogSlice.status;
export const selectAllBlogs = (state) => state.blogSlice.blogs;
export const selectBlogErrors = (state) => state.blogSlice.errors;
export const selectBlogSuccessMessage = (state) => state.blogSlice.successMessage;
export const selectBlogAddStatus = (state) => state.blogSlice.blogAddStatus;
export const selectBlogDeleteStatus = (state) => state.blogSlice.blogDeleteStatus;
export const selectBlogUpdateStatus = (state) => state.blogSlice.blogUpdateStatus;
export const selectBlogFetchStatus = (state) => state.blogSlice.blogFetchStatus;

// Exporting actions
export const {
  resetBlogAddStatus,
  resetBlogDeleteStatus,
  resetBlogUpdateStatus,
  resetBlogFetchStatus,
} = blogSlice.actions;

export default blogSlice.reducer;
