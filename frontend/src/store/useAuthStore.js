import { create } from 'zustand';
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios.js';
import { Navigate } from 'react-router-dom';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSiginingUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    tempEmail: null,

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
            // currently no email verification, so directly set user
            set({ authUser: res.data?.user });
            toast.success("Signup successful");
            // toast.success("verification mail sent");
            // set({ tempEmail: data.email }); // store email temporarily for verification
            // navigate('/verify-email');
            navigate('/dashboard'); // navigate to dashboard as now user even if not verified
        }
        catch (error) {
            console.error("Signup error:", error);
            toast.error("Signup failed. Please try again.");
        }
        finally {
            set({ isSiginingUp: false });
        }
    },

    verifyEmailToken: async (token, navigate) => {
        try {
            const res = await axiosInstance.get(`/auth/verify-email/${token}`);
            set({ authUser: res.data?.user });
            toast.success(res.data?.message || "Email verified!");

            if (res.data?.user?.role === "admin") {
                const adminRedirectUrl = import.meta.env.MODE === 'production'
                    ? 'https://futureforge.vercel.app/dashboard'
                    : 'http://localhost:5174/dashboard';
                window.location.href = adminRedirectUrl; // redirect to admin dashboard
            }

            else {
                navigate('/dashboard');         // navigate to dashboard as now user is verified
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Invalid/expired token");
            navigate('/login');
        }
    },

    login: async (data, navigate) => {
        set({ isLoggingIn: true });

        try {
            const res = await axiosInstance.post('/auth/login', data);
            set({ authUser: res.data?.user });
            toast.success("Login successful");

            if (res.data?.user?.role === "admin") {
                const adminRedirectUrl = import.meta.env.MODE === 'production'
                    ? 'https://futureforge.vercel.app/dashboard'
                    : 'http://localhost:5174/dashboard';
                window.location.href = adminRedirectUrl; // redirect to admin dashboard
            }
            else {
                navigate('/dashboard'); // navigate to user dashboard
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