import { axiosInstance } from "../../config/axios"

export const couponCreate = async (payload) => {
    try {
        const res = await axiosInstance.post("/coupon", payload);
        return res.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
export const getAllCoupon = async () => {
    try {
        const res = await axiosInstance.get('/coupon')

        return res.data
    } catch (error) {
        throw error.response || error.message
    }
}

export const updateCouponById = async (update) => {
    try {
        const res = await axiosInstance.patch(`/${update._id}`, update);
        return res.data;
    } catch (error) {
        throw error.response || error.message;
    }
};
export const deleteCouponById = async (id) => {
    try {
        const res = await axiosInstance.delete(`/${id}`);  
        return res.data;
    } catch (error) {
        throw error.response || error.message;
    }
};


// Get coupon code by coupon ID
export const getCouponCodeById = async (couponId) => {
    try {
      const res = await axiosInstance.get(`/coupon/code/${couponId}`);
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  
  // Get coupon by ID
  export const getCouponById = async (id) => {
    try {
      const res = await axiosInstance.get(`/coupon/${id}`);
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  
  // Check if a coupon code is valid
  export const checkCouponCodeIssue = async (couponId,userId) => {
    try {
      const res = await axiosInstance.post(`/coupon/${couponId}/issue`,  { userId });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  
  // Decrease the max issuance of a coupon
  export const couponMaxIssuanceDecreament = async (couponId) => {
    try {
      const res = await axiosInstance.post(`/coupon/${couponId}/decrement`);
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  
