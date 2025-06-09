import { axiosInstance } from '../../config/axios';

// Add item to the cart
export const addToCart = async (item) => {
  try {
    const res = await axiosInstance.post('/cart', item);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Fetch cart items by user ID
export const fetchCartByUserId = async (id) => {
  try {
    const res = await axiosInstance.get(`/cart/user/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update cart item by ID
export const updateCartItemById = async (update) => {
  try {
    const res = await axiosInstance.patch(`/cart/${update._id}`, update);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete cart item by ID
export const deleteCartItemById = async (id) => {
  try {
    const res = await axiosInstance.delete(`/cart/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Reset cart by user ID
export const resetCartByUserId = async (userId) => {
  try {
    const res = await axiosInstance.delete(`/cart/user/${userId}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


