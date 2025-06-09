import { axiosInstance } from "../../config/axios";
export const addbrand = async (data) => {
    try {
      const res = await axiosInstance.post("/brands/create", data);  
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  export const fetchAllBrands=async()=>{
    try {
        const res=await axiosInstance.get("brands")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}