import { axiosInstance } from "../../config/axios"


export const addProduct=async(data)=>{
    try {
        const res=await axiosInstance.post('/products',data);
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const fetchAllProducts=async(data)=>{
    try {
        const res=await axiosInstance.get('/products',data);
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const fetchFilterProducts = async (filters) => {

    let queryString = '';
     if (filters.searchTerm) {
        queryString += `search=${encodeURIComponent(filters.searchTerm)}&`;
    }
    if (filters.brand) {
        filters.brand.forEach((brand) => {
            queryString += `brand=${brand}&`;
        });
    }
    if (filters.category) {
        filters.category.forEach((category) => {
            queryString += `category=${category}&`;
        });
    }
    if (filters.pagination) {
        queryString += `page=${filters.pagination.page}&limit=${filters.pagination.limit}&`;
    }
    if (filters.sort) {
        queryString += `sort=${filters.sort.sort}&order=${filters.sort.order}&`;
    }
    if (filters.user) {
        queryString += `user=${filters.user}&`;
    }
    try {
        const res = await axiosInstance.get(`/products?${queryString}`);
        const totalResults = res.headers['x-total-count'];
        return { data: res.data, totalResults: totalResults };
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const fetchProductById=async(id)=>{
    try {
        const res=await axiosInstance.get(`products/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}


export const deleteProductById=async(id)=>{
    try {
        const res=await axiosInstance.delete(`products/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateProductById=async(productId, formData)=>{
    try {
        const res=await axiosInstance.patch(`products/${productId}`, formData)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
