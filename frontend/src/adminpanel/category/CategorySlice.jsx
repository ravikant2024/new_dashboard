import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addCategory, deletCategoryById, fetchAllCategories, updateCategoryById } from "./CategoryApi";

const initialState = {
    status: "idle",
    categoryAddStatus: "idle",
    categoryFetchStatus: "idle",
    categoryDeleteStatus: "idle",
    categoryUpdateStatus: "idle",
    category: [],
    selectedCategory: null,
    errors: null,
    successMessage: null,
};

// Add a new category asynchronously
export const addCategoryAsync = createAsyncThunk("categories/addCategoryAsync", async (data) => {
    const addedCategory = await addCategory(data);
    return addedCategory;
});

// Fetch all categories asynchronously
export const fetchCategoryAsync = createAsyncThunk("categories/fetchCategoryAsync", async () => {
    const categories = await fetchAllCategories();
    return categories;
});

// Update a category by ID asynchronously
export const updateCategoryByIdAsync = createAsyncThunk(
    "categories/updateCategoryByIdAsync",
    async ({ id, formData }) => {
      const updatedCategory = await updateCategoryById(id, formData);
      return updatedCategory;
    }
  );
  
// Delete a category by ID asynchronously
export const deleteCategoryByIdAsync = createAsyncThunk("categories/deleteCategoryByIdAsync", async (id) => {
   await deletCategoryById(id);
    return { id };;
});

const categorySlice = createSlice({
    name: "categorySlice",
    initialState,
    reducers: {
        resetCategoryStatus: (state) => {
            state.status = "idle";
            state.errors = null;
        },
        resetCategoryFetchStatus: (state) => {
            state.categoryFetchStatus = "idle";
        },
        resetCategoryDeleteStatus: (state) => {
            state.categoryDeleteStatus = "idle";
        },
        resetCategoryUpdateStatus: (state) => {
            state.categoryUpdateStatus = "idle"; 
        },
        resetCategoryDetails: (state) => {
            state.selectedCategory = null;
        },
        clearSelectedCategory: (state) => {
            state.selectedCategory = null;
        },
        resetCategoryAddStatus: (state) => {
            state.categoryAddStatus = "idle";
        }
        
    },
    extraReducers: (builder) => {
        builder
            // Handling fetch categories
            .addCase(fetchCategoryAsync.pending, (state) => {
                state.categoryFetchStatus = "pending";
            })
            .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
                state.categoryFetchStatus = "fulfilled";
                state.category = action.payload;
            })
            .addCase(fetchCategoryAsync.rejected, (state, action) => {
                state.categoryFetchStatus = "rejected";
                state.errors = action.error.message;
            })

            // Handling add category
            .addCase(addCategoryAsync.pending, (state) => {
                state.categoryAddStatus = "pending";
            })
            .addCase(addCategoryAsync.fulfilled, (state, action) => {
            
                state.categoryAddStatus = "fulfilled";
                state.category.push(action.payload);
            })
            .addCase(addCategoryAsync.rejected, (state, action) => {
                state.categoryAddStatus = "rejected";
                state.errors = action.error.message;
            })

            // Handling update category by ID
            .addCase(updateCategoryByIdAsync.pending, (state) => {
                state.categoryUpdateStatus = "pending";
            })
            .addCase(updateCategoryByIdAsync.fulfilled, (state, action) => {
                state.categoryUpdateStatus = "fulfilled";
                state.category = state.category.map((category) =>
                    category._id === action.payload._id ? action.payload : category
                );
                state.successMessage = "Category updated successfully";
            })
            .addCase(updateCategoryByIdAsync.rejected, (state, action) => {
                state.categoryUpdateStatus = "rejected";
                state.errors = action.error.message;
            })

            // Handling delete category by ID
            .addCase(deleteCategoryByIdAsync.pending, (state) => {
                state.categoryDeleteStatus = "pending";
            })
            .addCase(deleteCategoryByIdAsync.fulfilled, (state, action) => {
                state.categoryDeleteStatus = "fulfilled";
                state.category = state.category.filter(
                  (category) => category._id !== action.payload.id 
                );
                state.successMessage = "Category deleted successfully";
              })
              
            .addCase(deleteCategoryByIdAsync.rejected, (state, action) => {
                state.categoryDeleteStatus = "rejected";
                state.errors = action.error.message;
            });
    },
});

// Selectors to access the state
export const selectCategory = (state) => state.categorySlice.category;
export const selectSelectedCategory = (state) => state.categorySlice.selectedCategory;
export const selectCategoryErrors = (state) => state.categorySlice.errors;
export const selectCategoryAddStatus = (state) => state.categorySlice.categoryAddStatus;
export const selectCategoryFetchStatus = (state) => state.categorySlice.categoryFetchStatus;
export const selectCategoryDeleteStatus = (state) => state.categorySlice.categoryDeleteStatus;
export const selectCategoryUpdateStatus = (state) => state.categorySlice.categoryUpdateStatus; // Selector for update status
export const selectCategorySuccessMessage = (state) => state.categorySlice.successMessage;

export const {
    resetCategoryStatus,
    resetCategoryFetchStatus,
    resetCategoryDeleteStatus,
    resetCategoryUpdateStatus,
    resetCategoryDetails,
    clearSelectedCategory,
    resetCategoryAddStatus
} = categorySlice.actions;

export default categorySlice.reducer;
