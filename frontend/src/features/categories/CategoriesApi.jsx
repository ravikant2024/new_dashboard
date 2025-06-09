import {  axiosInstance } from "../../config/axios"

export const fetchAllCategories=async()=>{
    try {
        const res=await axiosInstance.get("/categories")
        console.log("res",res)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}