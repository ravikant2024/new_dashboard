import { axiosInstance } from '../../config/axios';


export const shippingcharge = async (data) => {
  try {
    const res = await axiosInstance.post('/shipping-charge/create', data);
    return res.data;
  } catch (error) {
    throw error.response?.data || 'Message failed';
  }
};

export const getShippingchargeByAddress = async (data) => {
  try {
    const res = await axiosInstance.post('/shipping-charge/getchargebyaddres', data);
    return res.data;
  } catch (error) {
    throw error.response?.data || 'Message failed';
  }
};

export const getshippingchargelist = async () => {
  try {
    const res = await axiosInstance.get('/shipping-charge');
    return res.data;
  } catch (error) {
    throw error.response?.data || 'Failed to fetch contacts';
  }
};