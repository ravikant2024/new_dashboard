import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addToCart,
  deleteCartItemById,
  fetchCartByUserId,
  resetCartByUserId,
  updateCartItemById,
} from './CartApi';

const initialState = {
  status: 'idle',
  items: [],
  cartItemAddStatus: 'idle',
  cartItemRemoveStatus: 'idle',
  errors: null,
  successMessage: null,

};

// Add to cart
export const addToCartAsync = createAsyncThunk('cart/addToCartAsync', async (item) => {
  const addedItem = await addToCart(item);
  return addedItem;
});

// Fetch cart by user ID
export const fetchCartByUserIdAsync = createAsyncThunk('cart/fetchCartByUserIdAsync', async (id) => {
  const items = await fetchCartByUserId(id);
  return items;
});

// Update cart item by ID
// export const updateCartItemByIdAsync = createAsyncThunk('cart/updateCartItemByIdAsync', async (update) => {
//   const updatedItem = await updateCartItemById(update);
//   return updatedItem;
// });


export const updateCartItemByIdAsync = createAsyncThunk(
  'cart/updateCartItemByIdAsync',
  async (update, { dispatch }) => {
    if (update.quantity === 0) {
      // Call delete API
      const deletedItem = await deleteCartItemById(update._id);
      return { ...deletedItem, deleted: true };
    } else {
      const updatedItem = await updateCartItemById(update);
      return updatedItem;
    }
  }
);

// Delete cart item by ID
export const deleteCartItemByIdAsync = createAsyncThunk('cart/deleteCartItemByIdAsync', async (id) => {
  const deletedItem = await deleteCartItemById(id);
  return deletedItem;
});

// Reset cart by user ID
export const resetCartByUserIdAsync = createAsyncThunk('cart/resetCartByUserIdAsync', async (userId) => {
  const updatedCart = await resetCartByUserId(userId);
  return updatedCart;
});



// Cart slice
const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    resetCartItemAddStatus: (state) => {
      state.cartItemAddStatus = 'idle';
    },
    resetCartItemRemoveStatus: (state) => {
      state.cartItemRemoveStatus = 'idle';
    },
    clearCart: (state) => {
      state.items = [];
    },

  },
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCartAsync.pending, (state) => {
        state.cartItemAddStatus = 'pending';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.cartItemAddStatus = 'fulfilled';
        state.items.push(action.payload);
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.cartItemAddStatus = 'rejected';
        state.errors = action.error;
      })

      // Fetch cart by user ID
      .addCase(fetchCartByUserIdAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchCartByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.items = action.payload;
      })
      .addCase(fetchCartByUserIdAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.errors = action.error;
      })

      // Update cart item by ID
      .addCase(updateCartItemByIdAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateCartItemByIdAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        const item = action.payload;

        if (item.deleted) {
          // Remove item from state
          state.items = state.items.filter(i => i._id !== item._id);
        } else {
          // Update item normally
          const index = state.items.findIndex(i => i._id === item._id);
          if (index !== -1) {
            state.items[index] = item;
          }
        }
      })


      .addCase(updateCartItemByIdAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.errors = action.error;
      })

      // Delete cart item by ID
      .addCase(deleteCartItemByIdAsync.pending, (state) => {
        state.cartItemRemoveStatus = 'pending';
      })
      .addCase(deleteCartItemByIdAsync.fulfilled, (state, action) => {
        state.cartItemRemoveStatus = 'fulfilled';
        state.items = state.items.filter((item) => item._id !== action.payload._id);
      })
      .addCase(deleteCartItemByIdAsync.rejected, (state, action) => {
        state.cartItemRemoveStatus = 'rejected';
        state.errors = action.error;
      })

      // Reset cart by user ID
      .addCase(resetCartByUserIdAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(resetCartByUserIdAsync.fulfilled, (state) => {
        state.status = 'fulfilled';
        state.items = [];
      })
      .addCase(resetCartByUserIdAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.errors = action.error;
      })
  },
});

// Selectors
export const selectCartStatus = (state) => state.CartSlice.status;
export const selectCartItems = (state) => state.CartSlice.items;
export const selectCartErrors = (state) => state.CartSlice.errors;
export const selectCartSuccessMessage = (state) => state.CartSlice.successMessage;
export const selectCartItemAddStatus = (state) => state.CartSlice.cartItemAddStatus;
export const selectCartItemRemoveStatus = (state) => state.CartSlice.cartItemRemoveStatus;


// Reducers
export const {
  resetCartItemAddStatus,
  resetCartItemRemoveStatus,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
