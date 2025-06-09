import { axiosInstance } from "../../config/axios";
export const addCategory = async (data) => {
    try {
      const res = await axiosInstance.post("/categories/create", data);  
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  // Get All Category
export const fetchAllCategories=async()=>{
  try {
      const res=await axiosInstance.get("/categories")
      return res.data
  } catch (error) {
      throw error.response.data
  }
}
// Update category
export const updateCategoryById = async (id, categoryData) => {
      const res = await axiosInstance.patch(`/categories/${id}`, categoryData);
      return res.data;
};

  // Delete Category
export const deletCategoryById=async(id)=>{
  try {
      const res=await axiosInstance.delete(`/categories/${id}`)
      return res.data
  } catch (error) {
      throw error.response.data
  }
}