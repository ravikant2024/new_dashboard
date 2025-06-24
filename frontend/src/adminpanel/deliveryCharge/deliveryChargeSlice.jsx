import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {  getShippingchargeByAddress, getshippingchargelist, shippingcharge } from './deliveryChargeApi';

// Thunk to create shipping charges
export const createShippingCharge = createAsyncThunk('shippingCharge/create', async (data, { rejectWithValue }) => {
    try {
        return await shippingcharge(data);
    } catch (err) {
        return rejectWithValue(err);
    }
}
);

// Thunk to fetch charge by address
export const fetchShippingchargeByAddress = createAsyncThunk(
  'shippingCharge/fetchByAddress',
  async (data, { rejectWithValue }) => {
    try {
      const result = await getShippingchargeByAddress(data);
      return result;
    } catch (err) {
      return rejectWithValue(err.message || 'Shipping charge fetch failed');
    }
  }
);



// Thunk to fetch all charges
export const fetchShippingChargeslist = createAsyncThunk('shippingCharge/fetchList', async (_, { rejectWithValue }) => {
    try {
        return await getshippingchargelist();
    } catch (err) {
        return rejectWithValue(err.response?.data || err.message);
    }
}
);

const ShippingChargeSlice = createSlice({
    name: 'shippingCharge',
    initialState: {
        allShippingCharges: [],
        status: 'idle',
        error: null,
        success: null,
        fetchStatus: 'idle',
        fetchError: null,
        shippingChargeByAddress: null,
        shippingChargeByAddressStatus: 'idle',
        shippingChargeByAddressError: null,
    },
    reducers: {
        resetShippingStatus: (state) => {
            state.status = 'idle';
            state.error = null;
            state.success = null;
        },
        resetShippingChargeByAddress: (state) => {
            state.shippingChargeByAddress = null;
            state.shippingChargeByAddressStatus = 'idle';
            state.shippingChargeByAddressError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create shipping charge
            .addCase(createShippingCharge.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(createShippingCharge.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.success = true;
                state.allShippingCharges.push(action.payload.area || action.payload);
            })
            .addCase(createShippingCharge.rejected, (state, action) => {
                state.status = 'rejected';
                state.success = false;
                state.error = action.payload || action.error.message;
            })

            // Fetch all shipping charges
            .addCase(fetchShippingChargeslist.pending, (state) => {
                state.fetchStatus = 'pending';
                state.fetchError = null;
            })
            .addCase(fetchShippingChargeslist.fulfilled, (state, action) => {
                state.fetchStatus = 'fulfilled';
                state.allShippingCharges = action.payload;
            })
            .addCase(fetchShippingChargeslist.rejected, (state, action) => {
                state.fetchStatus = 'failed';
                state.fetchError = action.payload || action.error.message;
            })

            // Fetch charge by address
            .addCase(fetchShippingchargeByAddress.pending, (state) => {
                state.shippingChargeByAddressStatus = 'pending';
                state.shippingChargeByAddress = null;
                state.shippingChargeByAddressError = null;
            })
            .addCase(fetchShippingchargeByAddress.fulfilled, (state, action) => {
                state.shippingChargeByAddressStatus = 'fulfilled';
                state.shippingChargeByAddress = action.payload.shipping_charge;
            })
            .addCase(fetchShippingchargeByAddress.rejected, (state, action) => {
                state.shippingChargeByAddressStatus = 'failed';
                state.shippingChargeByAddressError = action.payload || action.error.message;
            });
    }
});

// Actions
export const { resetShippingStatus, resetShippingChargeByAddress } = ShippingChargeSlice.actions;

// Selectors
export const selectShippingStatus = (state) => state.shippingCharge.status;
export const selectShippingSuccess = (state) => state.shippingCharge.success;
export const selectShippingError = (state) => state.shippingCharge.error;

export const selectAllShippingCharges = (state) => state.shippingCharge.allShippingCharges;
export const selectFetchStatus = (state) => state.shippingCharge.fetchStatus;
export const selectFetchError = (state) => state.shippingCharge.fetchError;

export const selectShippingChargeByAddress = (state) => state.shippingCharge.shippingChargeByAddress;
export const selectShippingChargeByAddressStatus = (state) => state.shippingCharge.shippingChargeByAddressStatus;
export const selectShippingChargeByAddressError = (state) => state.shippingCharge.shippingChargeByAddressError;

export default ShippingChargeSlice.reducer;
