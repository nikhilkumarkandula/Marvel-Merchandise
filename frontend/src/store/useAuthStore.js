import { create } from "zustand"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
    authUser:null,
    isCheckingAuth:true,
    isSigningup:false,
    isLoggingIn:false,

    checkAuth: async() => {

        try{
            const res = await axiosInstance.get("auth/check",);
            set({authUser:res.data});
        } catch (err){
            console.log("Error in check auth",err);
            set({authUser:null});
        } finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async(data) =>{
        set({isSigningup:true})

        try{
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser:res.data})
            toast.success("Account created sucessfully")
        } catch(err){
            toast.error(err.response.data.message);

        }finally {
            set({isSigningUp: false});
        }
    },

    login: async (data) => {
        set({isLoggingIn:true})

        try{
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser:res.data})
            toast.success("Logged in sucessfully")
        } catch(err){
            toast.error(err.response.data.message);

        }finally {
            set({isLoggingIn: false});
        }
    },

    logout: async() => {
        set({authUser:null});

        try{
            const res = await axiosInstance.post("/auth/logout");
            toast.success("Logged out sucessfully")
        } catch(err){
            toast.error(err.response.data.message);
        }
    },

    forgotPassword: async(data) => {
        try {
            console.log(data);
            const res = await axiosInstance.post("/auth/forgot-password", data);
            toast.success(res.data.message);
          } catch (err) {
            toast.error(err.response.data.message || "Something went wrong");
          }
    },

    verifyOtp: async (data) =>{
        try {
            const res = await axiosInstance.put("/auth/verify-otp", data);
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message || "Something went wrong");
        }
    },
}))