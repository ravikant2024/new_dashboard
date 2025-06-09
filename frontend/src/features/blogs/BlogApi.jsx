import { axiosInstance } from '../../config/axios';

export const addBlog = async (data) => {
  try {
    const res = await axiosInstance.post('/blogs', data);
    return res.data;
  } catch (error) {
    throw error.response?.data || 'Add blog failed';
  }
};

export const fetchAllBlogs = async () => {
  try {
    const res = await axiosInstance.get('/blogs');
    return res.data;
  } catch (error) {
    throw error.response?.data || 'Fetch failed';
  }
};

export const updateBlogById = async ({ id, data }) => {
  try {
    const res = await axiosInstance.patch(`/blogs/${id}`, data);
    
    return res.data;
  } catch (error) {
    throw error.response?.data || 'Update failed';
  }
};

// Delete Blog
export const deleteBlogById = async (id) => {
  try {
    const res = await axiosInstance.delete(`/blogs/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || 'Delete failed';
  }
};
