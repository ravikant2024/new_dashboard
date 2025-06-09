import { axiosInstance } from "../../config/axios"

export const addAddress = async (address) => {
    try {
        const res = await axiosInstance.post('/address', address)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const fetchAddressByUserId = async (id) => {
    try {
        const res = await axiosInstance.get(`address/user/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}


export const deleteAddressById = async (id) => {
    try {
        const res = await axiosInstance.delete(`/address/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateAddressById=async(update)=>{

    try {
        const res=await axiosInstance.patch(`address/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}