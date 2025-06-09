import { axiosInstance } from '../../config/axios';

export const contact = async (data) => {
  try {
    const res = await axiosInstance.post('/contactus', data);
    return res.data;
  } catch (error) {
    throw error.response?.data || 'Message failed';
  }
};