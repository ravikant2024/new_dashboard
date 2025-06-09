import { CustomStorageManager } from "../../classes/storageManager";
import { axiosInstance } from "../../config/axios";

export const signup = async (payload) => {
    try {
        const res = await axiosInstance.post("/auth/signup", payload);
        return res.data;
    } catch (error) {
        throw error.response?.data || error.message;  
    }
};

// ======== Login user ======== 
export const login = async (credentials) => {
    try {
        const res = await axiosInstance.post("/auth/login", credentials);
        if (res.data.token) {
            await CustomStorageManager.store("token", res.data.token);
            await CustomStorageManager.store("userData", JSON.stringify(res.data));
            // localStorage.setItem("userInfo", JSON.stringify(res.data));
        }
        return res.data;
    } catch (error) {
        throw error.response?.data || error.message;  
    }
};

/// Send OTP //
export const resendOtp = async (cred) => {
    try {
        const res = await axiosInstance.post("auth/resend-otp", cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
//  varify Otp ////

export const verifyOtp = async (cred) => {
    try {
        const res = await axiosInstance.post("auth/verify-otp", cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
//  Forget Password
export const forgotPassword = async (cred) => {
    try {
        const res = await axiosInstance.post("auth/forgot-password", cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

// / ResetPassword ///

export const resetPassword = async (cred) => {
    try {
        const res = await axiosInstance.post("auth/reset-password", cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

/// Logout ///
export const logout=async()=>{
   try {
    await CustomStorageManager.clearAll();
         const res = await axiosInstance.get("auth/logout");
         return res.data
     } catch (error) {
         throw error.response.data
     }
}


//// Delete Account ///

export const deleteuseraccount = async (payload) => {
    try {
        await CustomStorageManager.clearAll();
        const response = await axiosInstance.post('/auth/delete', payload);
        return response
    } catch (error) {
        throw error.response
    }
};


export const checkAuth = async () => {
    const token = await CustomStorageManager.fetch('token');
    try {
        const res = await axiosInstance.post("/auth/check-auth", {
            "token": token,
        });
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
