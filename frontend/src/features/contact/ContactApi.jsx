import { axiosInstance } from '../../config/axios';

export const contact = async (data) => {
  try {
    const res = await axiosInstance.post('/contactus', data);
    return res.data;
  } catch (error) {
    throw error.response?.data || 'Message failed';
  }
};
export const getAllContacts = async () => {
  try {
    const res = await axiosInstance.get('/contactus');
    return res.data;
  } catch (error) {
    throw error.response?.data || 'Failed to fetch contacts';
  }
};