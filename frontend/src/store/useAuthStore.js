import { create } from 'zustand';
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios.js';
import { Navigate } from 'react-router-dom';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSiginingUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check-auth');
            set({ authUser: res.data?.user })
        } 
        catch (error) {
            console.error("Error checking authentication:", error);
            set({ authUser: null });

        } 
        finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data, navigate) => {
        set({ isSiginingUp: true });

        try {
            const res = await axiosInstance.post('/auth/signup', data);
            set({ authUser: res.data?.user });
            toast.success("Signup successful");
            navigate('/dashboard');
        } 
        catch (error) {
            console.error("Signup error:", error);
            toast.error("Signup failed. Please try again.");
        } 
        finally {
            set({ isSiginingUp: false });
        }
    },

    login : async (data, navigate) => {
        set({ isLoggingIn : true });

        try{
            const res = await axiosInstance.post('/auth/login', data);
            set({ authUser: res.data?.user });
            toast.success("Login successful");
            navigate('/dashboard');
        } 
        catch (error) {
            console.error("Login error:", error);
            toast.error("Login failed. Please check your credentials.");
        } 
        finally {
            set({ isLoggingIn: false });
        }
    },

    logout : async () => {
        try{
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success("Logout successful");
        }
        catch (error) {
            console.error("Logout error:", error);
            toast.error("Logout failed. Please try again.");
        }
    }
}))