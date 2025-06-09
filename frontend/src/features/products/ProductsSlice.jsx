import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addProduct,
    deleteProductById,
    fetchProductById,
    fetchProductsAll,
    updateProductById,
} from "./ProductsApi";

// Initial state
const initialState = {
    status: "idle",
    productUpdateStatus: "idle",
    productAddStatus: "idle",
    productFetchStatus: "idle",
    productDeleteStatus: "idle",
    products: [],
    totalResults: 0,
    isFilterOpen: false,
    selectedProduct: null,
    errors: null,
    successMessage: null,
};

// Thunks
export const addProductAsync = createAsyncThunk(
    "products/addProductAsync",
    async (data) => {
        const addedProduct = await addProduct(data);
        return addedProduct;
    }
);

export const fetchProductsAsync = createAsyncThunk(
    "products/fetchProductsAsync",
    async (filters) => {
        const products = await fetchProductsAll(filters);
        return products;
    }
);

export const fetchProductByIdAsync = createAsyncThunk(
    "products/fetchProductByIdAsync",
    async (id) => {
        const selectedProduct = await fetchProductById(id);
        return selectedProduct;
    }
);

export const deleteProductByIdAsync = createAsyncThunk(
    "products/deleteProductByIdAsync",
    async (id) => {
        const deletedProduct = await deleteProductById(id);
        return deletedProduct;
    }
);

export const updateProductByIdAsync = createAsyncThunk(
    "products/updateProductByIdAsync",
    async ({ productId, formData }) => {
        const updatedProduct = await updateProductById(productId, formData);
        return updatedProduct;
    }
);

// Slice
const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        resetProductStatus: (state) => {
            state.status = "idle";
            state.errors = null;
        },
        resetProductFetchStatus: (state) => {
            state.productFetchStatus = "idle";
        },
        resetProductDetails: (state) => {
            state.selectedProduct = null;
        },
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
        resetProductAddStatus: (state) => {
            state.productAddStatus = "idle";
        },
        resetProductUpdateStatus: (state) => {
            state.productUpdateStatus = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            // Add product
            .addCase(addProductAsync.pending, (state) => {
                state.productAddStatus = "pending";
            })
            .addCase(addProductAsync.fulfilled, (state, action) => {
                state.productAddStatus = "fulfilled";
                state.products.push(action.payload);
            })
            .addCase(addProductAsync.rejected, (state, action) => {
                state.productAddStatus = "rejected";
                state.errors = action.error;
            })

            // Fetch all products
            .addCase(fetchProductsAsync.pending, (state) => {
                state.productFetchStatus = "pending";
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.productFetchStatus = "fulfilled";
                state.products = action.payload.data;
                state.totalResults = action.payload.totalResults;
            })
            .addCase(fetchProductsAsync.rejected, (state, action) => {
                state.productFetchStatus = "rejected";
                state.errors = action.error.message;
            })

            // Fetch single product
            .addCase(fetchProductByIdAsync.pending, (state) => {
                state.productFetchStatus = "pending";
            })
            .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
                state.productFetchStatus = "fulfilled";
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductByIdAsync.rejected, (state, action) => {
                state.productFetchStatus = "rejected";
                state.errors = action.error.message;
            })

            // Delete product
            .addCase(deleteProductByIdAsync.pending, (state) => {
                state.productDeleteStatus = "pending";
            })
            .addCase(deleteProductByIdAsync.fulfilled, (state, action) => {
                state.productDeleteStatus = "fulfilled";
                const index = state.products.findIndex(
                    (product) => product._id === action.payload.product._id
                );
                if (index !== -1) {
                    state.products.splice(index, 1);
                }
            })
            .addCase(deleteProductByIdAsync.rejected, (state, action) => {
                state.productDeleteStatus = "rejected";
                state.errors = action.error;
            })

            // Update product
            .addCase(updateProductByIdAsync.pending, (state) => {
                state.productUpdateStatus = "pending";
            })
            .addCase(updateProductByIdAsync.fulfilled, (state, action) => {
                state.productUpdateStatus = "fulfilled";
                const updatedProduct = action.payload.product;
                const index = state.products.findIndex(
                    (product) => product._id === updatedProduct._id
                );
                if (index !== -1) {
                    state.products[index] = updatedProduct;
                }
            })
            .addCase(updateProductByIdAsync.rejected, (state, action) => {
                state.productUpdateStatus = "rejected";
                state.errors = action.error;
            });
    },
});

// Export selectors
export const selectProducts = (state) => state.productSlice.products;
export const selectProductTotalResults = (state) => state.productSlice.totalResults;
export const selectSelectedProduct = (state) => state.productSlice.selectedProduct;
export const selectProductErrors = (state) => state.productSlice.errors;
export const selectProductFetchStatus = (state) => state.productSlice.productFetchStatus;
export const selectProductAddStatus = (state) => state.productSlice.productAddStatus;
export const selectProductSuccessMessage = (state) => state.productSlice.successMessage;
export const selectProductUpdateStatus = (state) => state.productSlice.productUpdateStatus;
export const selectProductDeleteStatus = (state) => state.productSlice.productDeleteStatus;

// Export actions
export const {
    resetProductStatus,
    resetProductFetchStatus,
    resetProductDetails,
    clearSelectedProduct,
    resetProductAddStatus,
    resetProductUpdateStatus, 
} = productSlice.actions;

// Export reducer
export default productSlice.reducer;
