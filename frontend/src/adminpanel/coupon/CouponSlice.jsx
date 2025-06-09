import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    checkCouponCodeIssue,
    couponCreate,
    couponMaxIssuanceDecreament,
    deleteCouponById,
    getAllCoupon,
    getCouponById,
    getCouponCodeById,
    updateCouponById
} from "./CouponApi";

// Create Coupon Async action
export const createCouponAsync = createAsyncThunk('coupon/createCouponAsync', async (data) => {
    const response = await couponCreate(data);
    return response;
});

// Fetch all Coupons Async action
export const getAllCouponAsync = createAsyncThunk('coupon/getAllCouponAsync', async () => {
    const response = await getAllCoupon();
    return response;
});

// Update Coupon Async action
export const updateCouponAsync = createAsyncThunk('coupon/updateCouponAsync', async (update) => {
    const updatedCoupon = await updateCouponById(update);
    return updatedCoupon;
});

// Delete Coupon Async action
export const deleteCouponByIdAsync = createAsyncThunk('coupon/deleteCouponByIdAsync', async (id) => {
    const response = await deleteCouponById(id); 
    return response;
});

// Get code by couponId
export const getCouponCodeByCouponIdAsync = createAsyncThunk(
    'coupon/getCouponCodeByCouponIdAsync', 
    async (couponData) => {
        const res = await getCouponCodeById(couponData);
        return res;
    }
);

// Get coupon by id
export const getCouponByIdAsync = createAsyncThunk(
    'coupon/getCouponByIdAsync',
    async (couponData) => {
        const res = await getCouponById(couponData);
        return res;
    }
);

// Check coupon
export const checkCouponCodeAsync = createAsyncThunk(
    'coupon/checkCouponCodeAsync',
    async (couponData) => {
        const res = await checkCouponCodeIssue(couponData);
        return res;
    }
);

// Coupon max issuance decrement
export const couponMaxIssuanceAsync = createAsyncThunk(
    'coupon/couponMaxIssuanceAsync',
    async (couponData) => {
        const res = await couponMaxIssuanceDecreament(couponData);
        return res;
    }
);

// Define the initial state
const initialState = {
    coupon: null,
    coupons: [],
    status: 'idle',
    error: null,
    addStatus: 'idle',
    successMessage: null,
    updateStatus: 'idle',
    deleteStatus: 'idle',
    discount: 0,
    totalAfterDiscount: 0,
    couponCodeStatus: 'idle',
    couponData: null,
};

const couponSlice = createSlice({
    name: 'couponSlice',
    initialState,
    reducers: {
        clearCouponError: (state) => {
            state.error = null;
        },
        clearCouponSuccessMessage: (state) => {
            state.successMessage = null;
        },
        clearUpdateStatus: (state) => {
            state.updateStatus = 'idle';
        },
        clearDeleteStatus: (state) => {
            state.deleteStatus = 'idle';
        },
        clearCoupon: (state) => {
            state.coupon = null;
            state.discount = 0;
            state.totalAfterDiscount = 0;
            state.couponData = null;
            state.couponCodeStatus = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Coupon
            .addCase(createCouponAsync.pending, (state) => {
                state.addStatus = 'pending';
            })
            .addCase(createCouponAsync.fulfilled, (state, action) => {
                state.addStatus = 'fulfilled';
                state.coupons.push(action.payload);
            })
            .addCase(createCouponAsync.rejected, (state, action) => {
                state.addStatus = 'rejected';
                state.error = action.error.message;
            })

            // Get All Coupons
            .addCase(getAllCouponAsync.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getAllCouponAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.coupons = action.payload;
                state.error = null;
            })
            .addCase(getAllCouponAsync.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })

            // Update Coupon
            .addCase(updateCouponAsync.pending, (state) => {
                state.updateStatus = 'pending';
            })
            .addCase(updateCouponAsync.fulfilled, (state, action) => {
                state.updateStatus = 'fulfilled';
                const index = state.coupons.findIndex((coupon) => coupon._id === action.payload._id);
                if (index !== -1) {
                    state.coupons[index] = { ...state.coupons[index], ...action.payload };
                }
            })
            .addCase(updateCouponAsync.rejected, (state, action) => {
                state.updateStatus = 'rejected';
                state.error = action.error.message;
            })

            // Delete Coupon
            .addCase(deleteCouponByIdAsync.pending, (state) => {
                state.deleteStatus = 'pending';
            })
            .addCase(deleteCouponByIdAsync.fulfilled, (state, action) => {
                state.deleteStatus = 'fulfilled';
                state.coupons = state.coupons.filter((coupon) => coupon._id !== action.payload._id);
            })
            .addCase(deleteCouponByIdAsync.rejected, (state, action) => {
                state.deleteStatus = 'rejected';
                state.error = action.error.message;
            })

            // Get coupon code by coupon ID
            .addCase(getCouponCodeByCouponIdAsync.pending, (state) => {
                state.couponCodeStatus = 'pending';
            })
            .addCase(getCouponCodeByCouponIdAsync.fulfilled, (state, action) => {
                state.couponCodeStatus = 'fulfilled';
                state.couponData = action.payload;
            })
            .addCase(getCouponCodeByCouponIdAsync.rejected, (state, action) => {
                state.couponCodeStatus = 'rejected';
                state.error = action.error.message;
            })

            // Get coupon by ID
            .addCase(getCouponByIdAsync.pending, (state) => {
                state.couponCodeStatus = 'pending';
            })
            .addCase(getCouponByIdAsync.fulfilled, (state, action) => {
                state.couponCodeStatus = 'fulfilled';
                state.couponData = action.payload;
            })
            .addCase(getCouponByIdAsync.rejected, (state, action) => {
                state.couponCodeStatus = 'rejected';
                state.error = action.error.message;
            })

            // Check coupon
            .addCase(checkCouponCodeAsync.pending, (state) => {
                state.couponCodeStatus = 'pending';
            })
            .addCase(checkCouponCodeAsync.fulfilled, (state, action) => {
                state.couponCodeStatus = 'fulfilled';
                state.coupon = action.payload;
            })
            .addCase(checkCouponCodeAsync.rejected, (state, action) => {
                state.couponCodeStatus = 'rejected';
                state.error = action.error.message;
            })

            // Coupon max issuance decrement
            .addCase(couponMaxIssuanceAsync.pending, (state) => {
                state.couponCodeStatus = 'pending';
            })
            .addCase(couponMaxIssuanceAsync.fulfilled, (state, action) => {
                state.couponCodeStatus = 'fulfilled';
                // Handle response for decrement if necessary
            })
            .addCase(couponMaxIssuanceAsync.rejected, (state, action) => {
                state.couponCodeStatus = 'rejected';
                state.error = action.error.message;
            });
    },
});

// Exporting actions and reducers
export const {
    clearCouponError,
    clearCouponSuccessMessage,
    clearUpdateStatus,
    clearDeleteStatus,
    clearCoupon,
} = couponSlice.actions;

// Selectors
export const selectCouponStatus = (state) => state.couponSlice.status;
export const selectCoupon = (state) => state.couponSlice.coupon;
export const selectAllCoupons = (state) => state.couponSlice.coupons;
export const selectCouponError = (state) => state.couponSlice.error;
export const selectAddStatus = (state) => state.couponSlice.addStatus;
export const selectCouponSuccessMessage = (state) => state.couponSlice.successMessage;
export const selectUpdateCouponStatus = (state) => state.couponSlice.updateStatus;
export const selectDeleteCouponStatus = (state) => state.couponSlice.deleteStatus;
export const selectCouponCodeStatus = (state) => state.couponSlice.couponCodeStatus;
export const selectGetCouponById = (state) => state.couponSlice.couponData;

export default couponSlice.reducer;
