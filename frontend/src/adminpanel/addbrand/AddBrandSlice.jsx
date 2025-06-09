import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addbrand, fetchAllBrands } from "./AddBrandApi";

const initialState = {
    status: "idle",
    brandAddStatus: "idle",
    brandFetchStatus: "idle",
    brands: [],
    selectedBrand: null,
    errors: null,
    successMessage: null,
};

// Add a new brand asynchronously
export const addBrandAsync = createAsyncThunk("brands/addBrandAsync",async (data) => {
        const addedBrand = await addbrand(data);
        return addedBrand;
    }
);

// Fetch all brands asynchronously
export const fetchBrandsAsync = createAsyncThunk("brands/fetchBrandsAsync",async () => {
        const brands = await fetchAllBrands();
        return brands;
    }
);

// Fetch a brand by ID asynchronously
export const fetchBrandByIdAsync = createAsyncThunk("brands/fetchBrandByIdAsync",async (id) => {
        const brand = await fetchBrandById(id);
        return brand;
    }
);


const brandSlice = createSlice({
    name: "brandSlice",
    initialState,
    reducers: {
        resetBrandStatus: (state) => {
            state.status = "idle";
            state.errors = null;
        },
        resetBrandFetchStatus: (state) => {
            state.brandFetchStatus = "idle";
        },
        resetBrandDetails: (state) => {
            state.selectedBrand = null;
        },
        clearSelectedBrand: (state) => {
            state.selectedBrand = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handling fetch brands
            .addCase(fetchBrandsAsync.pending, (state) => {
                state.brandFetchStatus = "pending";
            })
            .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
                state.brandFetchStatus = "fulfilled";
                state.brands = action.payload;
            })
            .addCase(fetchBrandsAsync.rejected, (state, action) => {
                state.brandFetchStatus = "rejected";
                state.errors = action.error.message;
            })

            // Handling fetch brand by ID
            .addCase(fetchBrandByIdAsync.pending, (state) => {
                state.brandFetchStatus = "pending";
            })
            .addCase(fetchBrandByIdAsync.fulfilled, (state, action) => {
                state.brandFetchStatus = "fulfilled";
                state.selectedBrand = action.payload;
            })
            .addCase(fetchBrandByIdAsync.rejected, (state, action) => {
                state.brandFetchStatus = "rejected";
                state.errors = action.error.message;
            })

            // Handling add brand
            .addCase(addBrandAsync.pending, (state) => {
                state.brandAddStatus = "pending";
            })
            .addCase(addBrandAsync.fulfilled, (state, action) => {
                state.brandAddStatus = "fulfilled";
                state.brands.push(action.payload);
            })
            .addCase(addBrandAsync.rejected, (state, action) => {
                state.brandAddStatus = "rejected";
                state.errors = action.error.message;
            });
    }
});

// Selectors to access the state
export const selectBrands = (state) => state.brandSlice.brands;
export const selectSelectedBrand = (state) => state.brandSlice.selectedBrand;
export const selectBrandErrors = (state) => state.brandSlice.errors;
export const selectBrandAddStatus = (state) => state.brandSlice.brandAddStatus;
export const selectBrandFetchStatus = (state) => state.brandSlice.brandFetchStatus;
export const selectBrandSuccessMessage = (state) => state.brandSlice.successMessage;

export const {
    resetBrandStatus,
    resetBrandFetchStatus,
    resetBrandDetails,
    clearSelectedBrand,
} = brandSlice.actions;

export default brandSlice.reducer;
