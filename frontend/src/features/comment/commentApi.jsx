// CommentApi.js

import { axiosInstance } from "../../config/axios";

export const addComments = async (data) => {
  try {
    const res = await axiosInstance.post('/comments', data);
    return res.data;
  } catch (error) {
    throw error.response?.data;
  }
};

export const fetchComments = async () => {
  try {
    const res = await axiosInstance.get('/comments');
    return res.data;
  } catch (error) {
    throw error.response?.data;
  }
};
