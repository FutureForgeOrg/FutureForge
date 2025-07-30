import { create } from 'zustand';
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios.js';
import { Navigate } from 'react-router-dom';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSiginingUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    // tempEmail: null,

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
            await axiosInstance.post('/admin/create-admin', data);
            // set({ authUser: res.data?.user });
            toast.success("Signup successful : admin created successfully");
            // set({ tempEmail: data.email }); // store email temporarily for verification
            // navigate('/verify-email');
            navigate('/login'); // redirect to dashboard after admin signup
            // as no jwt is generated during admin signup (coz created via other admin), we don't set authUser here
        }
        catch (error) {
            console.error("Signup error:", error);
            toast.error("Signup failed. Please try again.");
        }
        finally {
            set({ isSiginingUp: false });
        }
    },

    login: async (data, navigate) => {
        set({ isLoggingIn: true });

        try {
            const res = await axiosInstance.post('/admin/login', data);
            set({ authUser: res.data?.user });
            toast.success("Login successful");

            if (res.data?.user?.role === "user") {
                const adminRedirectUrl = import.meta.env.MODE === 'production'
                    ? 'https://futureforge.vercel.app/dashboard'
                    : 'http://localhost:5173/dashboard';
                window.location.href = adminRedirectUrl; // redirect to admin dashboard
            }
            else {
                navigate('/dashboard'); 
            }
        }
        catch (error) {
            console.error("Login error:", error);
            toast.error("Login failed. Please check your credentials.");
        }
        finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
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