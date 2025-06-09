import { axiosInstance} from '../../config/axios'

export const createReview=async(review)=>{
    try {
        const res=await axiosInstance.post('/reviews',review)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const fetchReviewsByProductId=async(id)=>{
    try {
        const res=await axiosInstance.get(`/reviews/product/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const fetchAllReviews=async(i)=>{
    try {
        const res=await axiosInstance.get(`/reviews/allReview`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateReviewById=async(update)=>{
    try {
        const res=await axiosInstance.patch(`/reviews/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const deleteReviewById=async(id)=>{
    try {
        const res=await axiosInstance.delete(`/reviews/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}