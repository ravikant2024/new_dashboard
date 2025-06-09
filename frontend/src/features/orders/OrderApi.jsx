import { axiosInstance } from "../../config/axios"

export const getAllOrders = async () => {
    try {
        const res = await axiosInstance.get(`/orders`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateOrderById = async (update) => {
    try {
        const res = await axiosInstance.patch(`orders/${update._id}`, update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
// IntialPayment
export const initiatePayment = async (payload) => {

    try {
        const res = await axiosInstance.post("orders/initiatePayment", payload)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const getOrderByUserId = async (id) => {
    try {
        const res = await axiosInstance.get(`orders/user/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const fetchOrderById = async (id) => {
    try {
        const res = await axiosInstance.get(`orders/fetchOrderById`, { params: { orderId: id }, });
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

