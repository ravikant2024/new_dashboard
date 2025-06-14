import { axiosInstance } from '../../config/axios';

export const bulkEnquiry = async (data) => {
  try {
    const res = await axiosInstance.post('/bulk-enquiry', data);
    return res.data;
  } catch (error) {
    throw error.response?.data || 'Message failed';
  }
};
export const getAllBulkEnquiry = async () => {
  try {
    const res = await axiosInstance.get('/bulk-enquiry');
    return res.data;
  } catch (error) {
    throw error.response?.data || 'Failed to fetch contacts';
  }
};