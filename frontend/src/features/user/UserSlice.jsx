import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserById, getAllUsers, updateUserById, updateRoleByUser } from "./UserApi";

// Initial state for the user slice
const initialState = {
  status: "idle",
  userInfo: null,
  errors: null,
  successMessage: null,
  userRoleUpdate: {
    status: "idle",  // Pending, Fulfilled, Rejected
    error: null,     // Error message in case of failure
    successMessage: null, // Success message after role update
  },
};

// Async thunk for updating the user role
export const updateUserRoleAsync = createAsyncThunk('users/updateUserRoleAsync', async ({ userId, newRole }) => {
    const response = await updateRoleByUser({ userId, newRole });
    return response;
});

// Async thunk for fetching logged-in user information
export const fetchLoggedInUserByIdAsync = createAsyncThunk('user/fetchLoggedInUserByIdAsync', async (id) => {
    const userInfo = await fetchLoggedInUserById(id);
    return userInfo;
});

// Async thunk for updating user information
export const updateUserByIdAsync = createAsyncThunk('user/updateUserByIdAsync', async (update) => {
    const updatedUser = await updateUserById(update);
    return updatedUser;
});

// Async thunk for getting all users
export const getAllUsersAsync = createAsyncThunk('user/getAllUsersAsync', async () => {
    const res = await getAllUsers();
    return res;
});

const UserSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    resetUserInfo: (state) => {
      state.userInfo = null;
    },
    resetUserRoleUpdate: (state) => {
      state.userRoleUpdate = {
        status: "idle",
        error: null,
        successMessage: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling fetchLoggedInUserByIdAsync
      .addCase(fetchLoggedInUserByIdAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchLoggedInUserByIdAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserByIdAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.errors = action.error.message;
      })

      // Handling updateUserByIdAsync
      .addCase(updateUserByIdAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateUserByIdAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.userInfo = action.payload;
      })
      .addCase(updateUserByIdAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.errors = action.error;
      })

      // Handling getAllUsersAsync
      .addCase(getAllUsersAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.usersList = action.payload;
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.errors = action.error.message;
      })

      // Handling updateUserRoleAsync
      .addCase(updateUserRoleAsync.pending, (state) => {
        state.userRoleUpdate.status = "pending";
        state.userRoleUpdate.error = null;
        state.userRoleUpdate.successMessage = null;
      })
      .addCase(updateUserRoleAsync.fulfilled, (state, action) => {
        state.userRoleUpdate.status = "fulfilled";
        
      })
      .addCase(updateUserRoleAsync.rejected, (state, action) => {
        state.userRoleUpdate.status = "rejected";
        state.userRoleUpdate.error = action.error.message;
      });
  },
});

export const { resetUserInfo, resetUserRoleUpdate } = UserSlice.actions;

// Exporting selectors for accessing the user state
export const selectUserStatus = (state) => state.userSlice.status;
export const selectUserInfo = (state) => state.userSlice.userInfo;
export const selectUsersList = (state) => state.userSlice.usersList;
export const selectUserErrors = (state) => state.userSlice.errors;
export const selectUserRoleUpdateStatus = (state) => state.userSlice.userRoleUpdate.status;
export const selectUserRoleUpdateError = (state) => state.userSlice.userRoleUpdate.error;
export const selectUserRoleUpdateSuccessMessage = (state) => state.userSlice.userRoleUpdate.successMessage;

export default UserSlice.reducer;
