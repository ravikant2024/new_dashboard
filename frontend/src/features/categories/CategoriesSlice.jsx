import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllCategories } from './CategoriesApi';

const initialState = {
    status: "idle",
    categories: [],
    errors: null
};

export const fetchAllCategoriesAsync = createAsyncThunk(
    'categories/fetchAllCategoriesAsync',
    async () => {
        const categories = await fetchAllCategories();
        return categories;
    }
);

const categoriesSlice = createSlice({
    name: "categories",  
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategoriesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.categories = action.payload;
            })
            .addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.errors = action.error;
            });
    }
});

// Corrected selectors
export const selectCategoryStatus = (state) => state.categories.status;
export const selectCategories = (state) => state.categories.categories;
export const selectCategoryErrors = (state) => state.categories.errors;

export default categoriesSlice.reducer;
