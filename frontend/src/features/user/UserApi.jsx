import { axiosInstance } from "../../config/axios"

export const fetchLoggedInUserById=async(id)=>{
    try {
        const res=await axiosInstance.get(`/users/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateUserById=async(update)=>{
    try {
        const res=await axiosInstance.patch(`/users/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const getAllUsers=async()=>{
    try {
        const res=await axiosInstance.get(`/users`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
// Update role by user
export const updateRoleByUser = async ({ userId, newRole }) => {
    try {
        const res = await axiosInstance.patch(`/users/${userId}/role`, { role: newRole });
        return res.data; 
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

