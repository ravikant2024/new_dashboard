import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchOrderById,
  getAllOrders,
  getOrderByUserId,
  initiatePayment,
  updateOrderById,
} from "./OrderApi";

const initialState = {
  status: "idle",
  orderUpdateStatus: "idle",
  orderFetchStatus: "idle",
  paymentStatus: "idle",
  orders: [],
  currentOrder: null,
  errors: null,
  successMessage: null,
};

export const getAllOrdersAsync = createAsyncThunk("orders/getAllOrdersAsync",async () => {
    const orders = await getAllOrders();
    return orders;
  }
);

export const updateOrderByIdAsync = createAsyncThunk("orders/updateOrderByIdAsync",async (update) => {
    const updatedOrder = await updateOrderById(update);
    return updatedOrder;
  }
);

export const initialpaymentAsync = createAsyncThunk("orders/initialpaymentAsync",async (order) => {
    const createdOrder = await initiatePayment(order);
    return createdOrder;
  }
);

export const getOrderByUserIdAsync = createAsyncThunk("orders/getOrderByUserIdAsync",async (id) => {
    const orders = await getOrderByUserId(id);
    return orders;
  }
);

export const fetchOrderByIdAsync = createAsyncThunk("orders/fetchOrderByIdAsync",async (id) => {
    const order = await fetchOrderById(id);
    return order;
  }
);

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: initialState,
  reducers: {
    resetCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    resetOrderFetchStatus: (state) => {
      state.orderFetchStatus = "idle";
    },
    resetOrderUpdateStatus: (state) => {
      state.orderUpdateStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllOrdersAsync
      .addCase(getAllOrdersAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
        state.orderFetchStatus = "fulfilled";
        state.orders = action.payload;
        state.errors = null;
      })
      .addCase(getAllOrdersAsync.rejected, (state, action) => {
        state.orderFetchStatus = "rejected";
        state.errors = action.error.message;
      })

      // updateOrderByIdAsync
      .addCase(updateOrderByIdAsync.pending, (state) => {
        state.orderUpdateStatus = "pending";
      })
      .addCase(updateOrderByIdAsync.fulfilled, (state, action) => {
        state.orderUpdateStatus = "fulfilled";
        const index = state.orders.findIndex((order) => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderByIdAsync.rejected, (state, action) => {
        state.orderUpdateStatus = "rejected";
        state.errors = action.error;
      })

      // initialpaymentAsync
      .addCase(initialpaymentAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(initialpaymentAsync.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.currentOrder = action.payload;
      })
      .addCase(initialpaymentAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.errors = action.error;
      })

      // getOrderByUserIdAsync
      .addCase(getOrderByUserIdAsync.pending, (state) => {
        state.orderFetchStatus = "pending";
      })
      .addCase(getOrderByUserIdAsync.fulfilled, (state, action) => {
        state.orderFetchStatus = "fulfilled";
        state.orders = action.payload;
      })
      .addCase(getOrderByUserIdAsync.rejected, (state, action) => {
        state.orderFetchStatus = "rejected";
        state.errors = action.error;
      })

      // fetchOrderByIdAsync
      .addCase(fetchOrderByIdAsync.pending, (state) => {
        state.orderFetchStatus = "pending";
      })
      .addCase(fetchOrderByIdAsync.fulfilled, (state, action) => {
        state.orderFetchStatus = "fulfilled";
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderByIdAsync.rejected, (state, action) => {
        state.orderFetchStatus = "rejected";
        state.errors = action.error;
      });
  },
});

// exporting reducers
export const { resetOrderFetchStatus, resetOrderUpdateStatus, resetCurrentOrder } = orderSlice.actions;

// exporting selectors
export const selectOrderStatus = (state) => state.orderSlice.status;
export const selectOrders = (state) => state.orderSlice.orders;
export const selectOrdersErrors = (state) => state.orderSlice.errors;
export const selectOrdersSuccessMessage = (state) => state.orderSlice.successMessage;
export const selectCurrentOrder = (state) => state.orderSlice.currentOrder;
export const selectOrderFetchStatus = (state) => state.orderSlice.orderFetchStatus;
export const selectOrderUpdateStatus = (state) => state.orderSlice.orderUpdateStatus;

export default orderSlice.reducer;
